import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText'
import { Theme } from '../Theme';
import  Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

export default function OfflineNotice() {
  const netInfo = useNetInfo();
  if(netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
          <AppText inputText='No Internet Connection' stylesLing={styles.text}/>
      </View>
    );

  return null
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center', 
        backgroundColor:Theme.colors.primary,
        height:60,
        justifyContent:'center',
        top:  Constants.statusBarHeight,
        width:'100%',
        zIndex:2

    },
    text:{
      textAlign:'center',
      color:Theme.colors.white,
      fontSize:19,
      marginBottom:20
    }
})