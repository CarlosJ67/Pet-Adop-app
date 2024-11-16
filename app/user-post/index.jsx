import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { db } from '../../config/FirebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from '../../components/Home/PetListItem';
import Colors from '../../constants/Colors';
export default function UserPost() {
    const navigation=useNavigation();
    const {user}=useUser();
    const [loader,setLoader]=useState(false);
    const [userPostList,setUserPostList]=useState([]);
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Mis Publicaciones'
        })
        user&&GetUserPost();
    },[user]);

    /**
     * Se utiliza para obtener publicaciones de usuario.
     */
    const GetUserPost=async()=>{
        setLoader(true);
        setUserPostList([]);
        const q=query(collection(db,'Pets'), where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserPostList(prev=>[...prev,doc.data()])
        })
        setLoader(false);
    }

    const OnDeletPost=(docId)=>{
        Alert.alert('¿Quieres eliminarlo?','¿Realmente quieres eliminar esta publicación?',[
            {
                text:'Cancelar',
                onPress:()=>console.log("Cancelar Click"),
                style:'cancel'
            },
            {
                text:'Eliminar',
                onPress:()=>deletePost(docId)
            }
        ])
    }

    const deletePost=async(docId)=>{
        await deleteDoc(doc(db,'Pets',docId));
        GetUserPost();
    }
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Publicaciones</Text>

      <FlatList 
      data={userPostList}
      numColumns={2}
      refreshing={loader}
      onRefresh={GetUserPost}
      renderItem={({item,index})=>(
        <View>
            <PetListItem pet={item} key={index}/>
            <Pressable onPress={()=>OnDeletPost(item?.id)} style={styles.deleteButton}>
                <Text style={{
                    fontFamily:'outfit',
                    textAlign:'center'
                }}>Eliminar</Text>
            </Pressable>
        </View>
      )}
      />

      {userPostList?.length==0 &&<Text>Ninguna publicacion que mostrar</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    deleteButton:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:5,
        borderRadius:7,
        marginTop:5,
        marginRight:10
    }
})