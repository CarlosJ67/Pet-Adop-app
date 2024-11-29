import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Profile() {
  /**
   * Configuracion de Menú 
   * 
   * Se crea un arreglo de las opciones disponibles en el menu de la aplicacion.
   * Cada una de estas opciones te permite navegar entre diferentes seccions de la aplicacion.
   */
  const Menu=[
  {
    id:1,
    name:'Agregar nueva mascota',
    icon:'add-circle',
    path:'/add-new-pet'
  },
  {
    id:5,
    name:'Mis Publicaciones',
    icon:'bookmark',
    path:'/user-post'
  },
  {
    id:2,
    name:'Favoritos',
    icon:'heart',
    path:'/(tabs)/favorite'
  },
  {
    id:3,
    name:'Bandeja de entrada',
    icon:'chatbubble',
    path:'/(tabs)/inbox'
  },
  {
    id:4,
    name:'Cerrar Sesion',
    icon:'exit',
    path:'logout'
  }
  ]
  const {user}=useUser();
  const router=useRouter();
  const {signOut}=useAuth();
   /**
   * Manejo de la funcion 'OnPressMenu'
   * 
   * Esta funcion maneja la accion que se ejecuta al seleccionar un opcion del menu
   */
  const onPressMenu=(menu)=>{
    if(menu=='logout')
    {
      signOut();
      return;
    }

    router.push(menu.path)
  }


  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Mi perfil</Text>

      <View style={{
        display:'flex',
        alignItems:'center',
        marginVertical:25
      }}>
        <Image source={{uri:user?.imageUrl}} style={{
          width:80,
          height:80,
          borderRadius:99,
        }}/>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:20,
          marginTop:6
        }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:16,
          color:Colors.GRAY
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList 
        data={Menu}
        renderItem={({item,index})=>(
          <TouchableOpacity
          onPress={()=>onPressMenu(item)}
          key={index.id}
          style={{
            marginVertical:10,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            backgroundColor:Colors.WHITE,
            padding:10,
            borderRadius:10
          }}>
            <Ionicons name={item?.icon} size={30} 
            color={Colors.PRYMARY} 
            style={{
              padding:10,
              backgroundColor:Colors.LIGHT_PRIMARY,
              borderRadius:10
            }}/>
            <Text style={{
              fontFamily:'outfit',
              fontSize:20
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}