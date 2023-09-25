import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Theme } from '../Theme';
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import { TouchableWithoutFeedback } from 'react-native';

export function ListItemDeleteAction({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <Icon name='trash-can' size={35} color={Theme.colors.white}/>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Theme.colors.danger,
        width:80,
        justifyContent:"center",
        alignItems:"center",
        height:80,
        alignSelf:'center'
    }
})