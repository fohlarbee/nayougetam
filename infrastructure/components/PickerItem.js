import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText'

export function PickerItem({item, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <AppText stylesLing={styles.picker} inputText={item.label}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    picker:{
        padding:10,
        fontSize:26
    }
})