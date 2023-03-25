import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Theme } from '../Theme';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export function TabButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name='plus-circle' color={Theme.colors.white} size={40}/>
      </View>
    </TouchableOpacity>
   
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor:Theme.colors.appBlue,
        borderRadius:40,
        borderColor:Theme.colors.light,
        borderWidth:10,
        bottom:40,
        justifyContent:'center',
        width:80,
        height:80
    }
})