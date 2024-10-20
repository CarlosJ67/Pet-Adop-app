import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Category from './Category'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

export default function PetListByCategory() {

  const [petList,setPetList]=useState([]);

  /**
   *  Se utiliza para obtener la lista de la categoria seleccionada. 
   * @param {*} category 
   */
  const GetPetList=async(category)=>{
    const q=query(collection(db,'Pets'), where('category','==',category?category:'Perros'));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach(doc=>{
      console.log(doc.data());
      setPetList(petList=>[...petList,doc.data()])
    })
  }


  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
      



      
    </View>
  )
}