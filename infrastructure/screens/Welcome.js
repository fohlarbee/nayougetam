import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import { Screen } from '../components/Screen'
import LottieView from 'lottie-react-native';
import { CustomButton } from '../components/CustomButton';
import { Theme } from '../Theme';


export function Welcome({navigation}) {
  return (
    <Screen style={styles.container}>
      <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.text}>Get Started</Text>
      </TouchableOpacity>
      {/* <View style={{flex:1}}>
        <LottieView 
        autoPlay
        loop
        style={{
          backgroundColor:'#eee',
        }}
  
        source={require('../../assets/animation/intro.json')}
        />
      </View> */}
     
      </Screen>
  
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    getStarted:{
      alignSelf:'flex-end',
      marginHorizontal:10
    },
    text:{
      color:Theme.colors.appBlueV2,
      marginVertical:10
    }
})