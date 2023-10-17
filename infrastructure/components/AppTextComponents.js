import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Theme } from '../Theme';
import { Platform } from 'react-native';
import { useState } from 'react';


export function AppTextComponents({icon, placeholder, width = "90%", ...otherProps}) {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container,{width}, isFocused && {borderWidth:1.5, borderColor:Theme.colors.appPurple}]}  accessible onAccessibilityAction={() => setIsFocused(true)}>
        { icon && <MaterialCommunityIcons name={icon} size={25} color='rgba(0,0,0,0.5)' style={styles.icon}/>  }
        <TextInput 
        style={[styles.textInput]} 
        {...otherProps} 
        placeholder={placeholder} 
        onFocus={()=> setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor='rgba(0,0,0,0.2)'
        
        
        />
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:20,
        backgroundColor:'rgba(0,0,0,0.01)',
        flexDirection:"row",
        padding:15,
        marginVertical:10,
        marginBottom:15,
        borderWidth:0.5,
        borderColor:'rgba(0,0,0,0.4)',
        alignSelf:'center',
        
    },
    textInput:{
        borderRadius:100,
        fontSize:15,
        width:"100%",
        color:Theme.colors.dark,
        flex:1,    
    },
    icon:{
        marginRight:10,
        marginTop:3
    }
    
})