import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          gap:20
        }}>
        <Image source={{uri:pet?.imageUser}} 
        style={{
            width:40,
            width:40,
            borderRadius:99
        }}
        />
        <View>
          <Text style={{
            fontFamily:'outfit-medium',
            fontSize:17
          }}>{pet?.username}</Text>
          <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
          }}> Dueño de la mascota</Text>
        </View>
        </View>
        <Ionicons name="send-sharp" size={24} color={Colors.PRYMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    borderWidth:1,
    borderRadius:15,
    padding:10,
    borderColor:Colors.PRYMARY,
    backgroundColor:Colors.WHITE,
    justifyContent:'space-between'
  }
})