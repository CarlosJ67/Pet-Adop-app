import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
    const navigation=useNavigation();
    const [formData,setFormData]=useState(
      {category:'Perros', sex:'Male'}
    );
    const [gender,setGender]=useState();
    const [categoryList, setCategortList]=useState([]);
    const [selectedCategory,setSelectedategory]=useState();
    const [image,setImage]=useState();
    const [loader,setLoader]=useState(false);
    const {user}=useUser();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Agregar Nueva Mascota'
        })
        GetCategories();
    },[])

      // Se utiliza "Get" para obtener la lista de la base de datos de Categorias
      const GetCategories=async() =>{
        setCategortList([]);
        const snapshot=await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
            console.log(doc.data())
            setCategortList(categoryList=>[...categoryList, doc.data()])
        })
    }

    /**
     * Se utiliza para seleccionar imágenes de la galería.
     */
    const imagePicker=async()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }

    const handleInputChange=(fielName,fielValue)=>{
        setFormData(prev=>({
            ...prev,
            [fielName]:fielValue
        }))
    }

    // Funcion de cuando los campos se manden vacios salga un mensaje de los datos faltantes
    const onSubmit=()=>{
      if(Object.keys(formData).length!=8)
      {
        ToastAndroid.show('Ingrese todos los Datos',ToastAndroid.SHORT)
        return;
      }
     // UploadImage();
      SaveFormData(null);
    }

    /*const UploadImage=async()=>{
      setLoader(true);
      const resp=await fetch(image);
      const blobImage=await resp.blob();
      const storageRef= ref(storage, '/PetAdop'+Date.now()+'.jpg');

      uploadBytes(storageRef,blobImage).then((snapshot)=>{
        console.log('File Upload')
      }).then(resp=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        })
      })
    }*/

      const SaveFormData = async (imageUrl) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'Pets', docId), {
          ...formData,
          imageUrl: imageUrl, // Será null si no estamos usando una imagen
          username: user?.fullName || 'Desconocido', // Valor por defecto si `user?.fullName` es undefined
          email: user?.primaryEmailAddress?.emailAddress || 'No especificado', // Valor por defecto si `email` es undefined
          imageUser: user?.imageUrl || null, // Deja `null` si `userImage` es undefined
          id: docId,
        });
        setLoader(false);
      };
  return (
    <ScrollView style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Agregar Nueva Mascota</Text>

      <Pressable onPress={imagePicker}>
      {!image?  <Image source={require('./../../assets/images/placerholder2.png')}
        style={{
          width:100,
          height:100,
          borderRadius:15,
          borderWidth:1,
          borderColor:Colors.GRAY
        }}
        />:
        <Image source={{uri:image}}
        style={{
          width:100,
          height:100,
          borderRadius:15,
        }}/>}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de la Mascota *</Text>
        <TextInput style={styles.input} onChangeText={(value)=>handleInputChange('name',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria de la Mascota *</Text>
        <Picker
            selectedValue={selectedCategory}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectedategory(itemValue);
                handleInputChange('category',itemValue)
            }}>
              {categoryList.map((category,index)=>(
                <Picker.Item key={index} label={category.name} value={category.name} />
              ))}
            
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Raza *</Text>
        <TextInput style={styles.input} 
        onChangeText={(value)=>handleInputChange('breed',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Edad *</Text>
        <TextInput style={styles.input} 
        keyboardType='numeric'
        onChangeText={(value)=>handleInputChange('age',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Genero *</Text>
        
        <Picker
            selectedValue={gender}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>{
                setGender(itemValue);
                handleInputChange('sex',itemValue)
            }}>
            <Picker.Item label="Hembra" value="Male" />
            <Picker.Item label="Macho" value="Famele" />
            </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Peso *</Text>
        <TextInput style={styles.input} 
          keyboardType='numeric'
        onChangeText={(value)=>handleInputChange('weight',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Direccion *</Text>
        <TextInput style={styles.input} onChangeText={(value)=>handleInputChange('address',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Acerca de la mascota *</Text>
        <TextInput style={styles.input} 
        numberOfLines={5}
        multiline={true}
        onChangeText={(value)=>handleInputChange('about',value)}/>
      </View>

      <TouchableOpacity 
      style={styles.button} 
      disabled={loader}
      onPress={onSubmit}>
        {loader?<ActivityIndicator size={'large'}/>:
        <Text style={{fontFamily:'outfit-medium', textAlign:'center'}}>Guardar</Text>
        }
      </TouchableOpacity>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:5
    },
    input:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:7,
        fontFamily:'outfit'
    },
    label:{
        marginVertical:5,
        fontFamily:'outfit'
    },
    button:{
        padding:15,
        backgroundColor:Colors.PRYMARY,
        borderRadius:7,
        marginVertical:10,
        marginBottom:50
    }
})