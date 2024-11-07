import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

export default function AboutPet({pet}) {
    const [readMore,setReadMore] = useState(true);
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-madium',
        fontSize:20
      }}>Acerca de {pet?.name}</Text>
      <Text numberOfLines={readMore?3:20} style={{
        fontFamily:'outfit',
        fontSize:14,
        color:Colors.GRAY
      }}>{pet.about} </Text>
      {readMore&& 
      <Pressable onPress={()=>setReadMore(false)}>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:14,
            color:Colors.SECONDARY
        }}>Leer más</Text>
      </Pressable>}
    </View>
  )
}