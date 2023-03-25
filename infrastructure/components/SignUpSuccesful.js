import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext, useState} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { Theme } from '../Theme';
import { AppContext } from '../Globals/AppContext';


export function SignUpSuccesful  ({successfulSwitch}) {

  return (
    <Modal visible={successfulSwitch} animationType='slide' transparent>
            <TouchableOpacity style={styles.touchable}>
            <View style={styles.modalContent}>
                <MaterialCommunityIcons name='check-circle' size={100} color='blue'/>
                <Text style={styles.text}>Account creation succesful</Text>
                <Text style={styles.subText}>LOGIN</Text>
            </View>
            </TouchableOpacity>
    </Modal>
  )
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    touchable:{
        flex:1,
        zIndex:2,
        backgroundColor:'#B2B2B2',
        alignItems:'center',
        justifyContent:'center',
        opacity:1
    },
    modalContent:{
        justifyContent:'center',
        alignItems:'center',
        
        backgroundColor:'#fff',
        width:150,
        height:150,
        borderRadius:5
    },
    text:{
        fontSize:12
    },
    subText:{
        marginTop:3,
        color:'red',
        fontSize:16
    }
})