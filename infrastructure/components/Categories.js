import { StyleSheet, View , Modal, useWindowDimensions, ImageBackground} from 'react-native'
import React from 'react'
import  Screen  from './Screen'
import { Text } from '@rneui/themed'
import  Constants from 'expo-constants';
import { TouchableWithoutFeedback } from 'react-native'




export default function Categories({isVisible}) {
  return (
    <Screen style={styles.container}>
        <Modal animationType='slide' visible={isVisible} style={{flex:1}}>
            <Text h4 style={{fontWeight:'600', marginHorizontal:20, marginVertical:20}} >Categories</Text>
            <View style={{flex:1, backgroundColor:'blue'}}>
            <TouchableWithoutFeedback style={{width:'100%'}}> 
                <View style={{width:'100%', height:200}}>
                  <ImageBackground
                  style={{width:'100%', height:100, backgroundColor:'red', marginHorizontal:20}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
        
        </Modal>
    </Screen>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },

})
