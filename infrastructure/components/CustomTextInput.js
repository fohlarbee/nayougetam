import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export function CustomTextInput({
  placeHolder, 
  headText, 
  shouldSecureText, 
  keyboardType,
  onChangeText,
  onBlur,
  numberOfLines
}) {
  return (
    <View style={styles.inputHolder}>
        <Text style={{fontSize:18}}>{headText}</Text>
      <TextInput style={styles.inputText}
      placeholder={placeHolder}
      placeholderTextColor="rgba(0,0,0,0.3)"
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={shouldSecureText}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      onBlur={onBlur}
      numberOfLines={numberOfLines}
      />
    </View>
  )
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    inputText:{
        borderColor:"#D6E4E5",
        borderWidth:1,
        width:width - 90,
        alignSelf:"center",
        marginTop:10,
        textAlign:"center" ,
        height:48,
        borderRadius:10,
        fontSize:20,
        color:"#497174"   
    },
    inputHolder:{
        alignSelf:"center",
        marginTop:5
    }
})