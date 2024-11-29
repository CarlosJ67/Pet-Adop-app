import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors'

/**
 * Componente 'TabLayout'
 * 
 * Este componente configura una barra de navegacion por pestañas (tabs) utilizando
 * el componente 'Tabs' de una libreria de navegacion de 'react-navigation'.
 * Cada pestaña representa una pantalla de la aplicacion y utiliza iconos de la libreria 
 * 'Ionicons' para mejorar la experiencia visual.
 * @returns {JSX.Element} Barra de navegacion con pestañas y pantalla configuradas.
 */

export default function TabLayout() {
  return (
    <Tabs
    // Para usar un color de tu preferencia se crea un archivo llamado Colors y vas exportando los colores en cada pestaña activa. 
    screenOptions={{
        tabBarActiveTintColor:Colors.PRYMARY
    }}
    >
        <Tabs.Screen name='home'
        options={{
            title:"Inicio",
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='favorite'
        options={{
            title:"Favorito",
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="heart" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='inbox'
        options={{
            title:"Mensaje",
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="chatbubble" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='profile'
        options={{
            title:"Perfil",
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />
        }}/>

    </Tabs>
  )
}