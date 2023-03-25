import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";

export function Icon({name, size=50, backgroundColor = "#000", iconColor="#fff", onPress, image}) {
    
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <View 
      style={{
        width:size,
        height:size,
        borderRadius:size / 2,
        backgroundColor,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:5,
        marginVertical:10,
        overflow:'hidden'
  
      }}
      >
        {image && <Image source={{uri:image}} style={{width:70, height:70, zIndex:2}}/>}

         {!image && <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5}  />}

      </View>
    </TouchableWithoutFeedback> 
  )
}

const styles = StyleSheet.create({
})