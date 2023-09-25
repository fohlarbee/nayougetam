import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ListItemSeparator() {
  return (
    <View style={styles.separator}/>
  )
}

const styles = StyleSheet.create({
    separator:{
        width:"100%",
        height:0.8,
        backgroundColor:"#f8f4f4" 
    }
})