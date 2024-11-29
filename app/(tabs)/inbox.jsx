import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'

export default function Inbox() {

  const {user}=useUser();
  const [userList,setUserList]=useState([]);
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    user&&GetUserList();
  },[user])
  // Obtener la lista de usuarios depende del correo electrónico del usuario actual
  const GetUserList=async()=>{
    setLoader(true)
    setUserList([])
    const q=query(collection(db,'Chat'),
    where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach(doc=>{
      //console.log(doc.data());
      setUserList(prevList=>[...prevList,doc.data()])
    })
    setLoader(false);
  }

  
  // Filtrar la lista de otro usuario en un estado.
  const MapOtherUserList=()=>{
    const list=[];
    userList.forEach((record)=>{
      const otherUser=record.users?.filter(user=>user?.email!=user?.primaryEmailAddress?.emailAddress);
      const result={
        docId:record.id,
        ...otherUser[0]
      }
      list.push(result)
    })

    return list;
  }

  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Mensajes</Text>
      <FlatList 
      data={MapOtherUserList()}
      refreshing={loader}
      onRefresh={GetUserList}
      style={{
        marginTop:20
      }}
      renderItem={({item,index})=>(
        <UserItem userInfo={item} key={index}/>
      )}
      />

    </View>
  )
}