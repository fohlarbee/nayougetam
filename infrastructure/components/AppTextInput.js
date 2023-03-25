import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Theme } from '../Theme';

export function AppTextInput({icon, width, ...otherProps}) {
  return (
    <View style={[styles.container, {width}]}>
         <MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>

         <TextInput
         style={styles.textInput}
         {...otherProps}
         placeholderTextColor={Theme.colors.appLameS}
         />

    </View>
  
  )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:Theme.colors.light,
        flexDirection:"row",
        borderRadius:10,
        width:"100%",
        padding:15,
        marginVertical:10

    },
    textInput:{
        fontSize:20,
        fontFamily:Platform.OS === "android" ? "Roboto" : "Avenir",
        color:Theme.colors.dark
    },
    icon:{
        color:Theme.colors.appLameS,
        marginRight:10
    }
})