import { StyleSheet, View , Modal} from 'react-native'
import React from 'react'
import { Screen } from './Screen'
import { Text } from '@rneui/themed'
import  Constants from 'expo-constants';


export default function Categories({isVisible}) {
  return (
    <Screen style={styles.container}>
        <Modal animationType='slide' visible={isVisible}>
            <Text h4 style={{fontWeight:'600', marginHorizontal:20, marginVertical:20}} >Categories</Text>
        
        </Modal>
    </Screen>
  )
}

const styles = StyleSheet.create({
    paddingTop:Constants.statusBarHeight,

})
