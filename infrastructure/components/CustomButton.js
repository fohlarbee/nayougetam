import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export function CustomButton({actionText, onPress, styling}) {
  return (
    <TouchableOpacity style={[styles.btn,styling]} onPress={onPress}>
        <Text 
        style={{
          textAlign:"left", 
          alignSelf:"center",
          fontSize:25, 
          color:"#fff"
          }}>{actionText}</Text>
    </TouchableOpacity>
  )
}

const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    btn:{
        width:width - 90,
        height:48,
        alignSelf:"center",
        marginTop:10,
        borderWidth:1,
        borderRadius:5,
        backgroundColor:"#0E64D2",
        justifyContent:"center",
        marginTop:35,
        borderColor:"#0E64D2"
    }
})