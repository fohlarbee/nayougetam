import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Theme } from '../Theme';
import { Platform } from 'react-native';


export function AppTextComponents({icon, placeholder, width = "100%", ...otherProps}) {
  return (
    <View style={[styles.container,{width}]}>
        { icon && <MaterialCommunityIcons name={icon} size={25} color={Theme.colors.appDull} style={styles.icon}/>  }
        <TextInput style={styles.textInput} {...otherProps} placeholder={placeholder} placeholderTextColor={Theme.colors.appLameS}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:Theme.colors.light,
        borderRadius:5,
        flexDirection:"row",
        padding:15,
        marginVertical:10,
        borderWidth:0.5,
        borderColor:Theme.colors.white,
        marginRight:10,
        borderColor:Theme.colors.appBlue
    },
    textInput:{
        fontSize:18,
        fontFamily:Platform.OS === "andriod" ? "Lato" : "Roboto",
        width:"100%",
        color:Theme.colors.dark
    

    },
    icon:{
        marginRight:10,
        marginTop:3
    }
    
})