import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from './../../constants/Colors'
export default function Category() {

    const [categoryList, setCategortList]=useState([]);
    const [selectedCategory,setSelectedategory]=useState('Perros');
    useEffect(()=>{
        GetCategories();
    }, [])

    // Se utiliza "Get" para obtener la lista de la base de datos de Categorias
    const GetCategories=async() =>{
        setCategortList([]);
        const snapshot=await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
            console.log(doc.data())
            setCategortList(categoryList=>[...categoryList, doc.data()])
        })
    }


  return (
    <View style={{
        marginTop:20,

    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Category</Text>

      <FlatList 
        data={categoryList}
        numColumns={3}
        renderItem={({item, index})=>(
            <TouchableOpacity 
                onPress={()=>setSelectedategory(item.name)}
            style={{
                flex:1
            }}>
                <View style={[styles.conatiner,
                  selectedCategory==item.name&&styles.selectedCategoryContainer  
                ]}>
                    <Image source={{uri:item?.imageUrl}}
                    style={{
                        width:50,
                        height:50 
                    }}
                    />
                </View>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'outfit'
                }}>{item?.name}</Text>
            </TouchableOpacity>
        )}
      />

    </View>
  )
}
const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:15,
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.PRYMARY,
        margin:5
    },
    selectedCategoryContainer:{
        backgroundColor:Colors.SECONDARY,
        borderColor:Colors.SECONDARY
    }
})