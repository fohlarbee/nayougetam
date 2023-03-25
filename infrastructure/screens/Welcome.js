import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '../components/Screen'
import { CustomButton } from '../components/CustomButton'

export function Welcome({navigation}) {
  return (
   <Screen style={styles.container}>
        <CustomButton actionText='Login' onPress={() => navigation.navigate('Login')}/>
        <CustomButton actionText='Sign up' onPress={() => navigation.navigate('Signup')}/>
   </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})