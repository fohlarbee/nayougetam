import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import  Constants from 'expo-constants';
import { Theme } from '../Theme';


export function Screen({children, style}) {
  return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={[style, styles.styleView]}>{children}</View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:Theme.colors.white
    },
    styleView:{
        flex:1
    }
})