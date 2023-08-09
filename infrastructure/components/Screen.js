import { StyleSheet, View, SafeAreaView} from 'react-native'
import React from 'react'

import { StatusBar } from 'expo-status-bar';
import  Constants  from 'expo-constants'

export default function Screen({ children, style}) {
  return (
    <SafeAreaView style={[styles.container, style ]}>
        <View style={[styles,{flex:1}]}>{children}
        <StatusBar style="dark" />

        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        paddingTop: Constants.statusBarHeight,
    }
})