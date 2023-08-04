import { Dimensions, StyleSheet, Text, TouchableOpacity,View } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export function CustomButton({actionText, onPress, styling, color, size, name, iconColor, textColor}) {
  return (
    <TouchableOpacity style={[styles.btn,styling, {backgroundColor:color}]} onPress={onPress}>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
      <MaterialCommunityIcons name={name} size={size} color={iconColor} style={{marginHorizontal:5}}/>
        <Text 
        style={{
          textAlign:"left", 
          alignSelf:"center",
          fontSize:15, 
          color:textColor,
          fontWeight:'bold'
          }}>{actionText}</Text>
      </View>
     
    </TouchableOpacity>
  )
}

const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    btn:{
        width:width - 50,
        height:55,
        alignSelf:"center",
        borderWidth:0.1,
        borderRadius:100,
        justifyContent:"center",
        // marginTop:35,
        // borderColor:"#0E64D2"
    }
})