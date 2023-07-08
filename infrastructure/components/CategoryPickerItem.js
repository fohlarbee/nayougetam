import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from './Icon'
import { AppText } from './AppText'

export default function CategoryPickerItem({item, onPress}) {
  return (
    <TouchableOpacity style={styles.container}  onPress={onPress}>
    <View>
        <Icon name={item.icon} backgroundColor={item.backgroundColor} size={50}/>
        <AppText stylesLing={styles.label} inputText={item.label} />
    </View>
    </TouchableOpacity>
  )
  
  
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:30,
        paddingVertical:15,
        alignItems:"center",
        width:"33%"
    },
    label:{
        marginTop:5,
        textAlign:"center",
        fontSize:9
    }
})