import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText'

export function ErrorMessage({error, style, visible, inputText}) {
    if( !visible || !error) return null;
  return (
   <AppText stylesLing={[styles.error, style]} inputText={error}/>
  )
}

const styles = StyleSheet.create({
    error:{
        color:"red"
    }
})