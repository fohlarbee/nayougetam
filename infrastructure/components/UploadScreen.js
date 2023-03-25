import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText';
import LottieView from 'lottie-react-native';


export function UploadScreen({onUpload = false, onUploadIndex}) { 
  return (
   <Modal visible={onUpload} animationType='slide'>
        <View style={styles.container}>
             <AppText inputText= 'Uploading' stylesLing={{alignText:'center'}}/>
             {/* <LottieView source={require('../../assets/animation/loader2.json')} autoPlay loop/> */}

            {/* {onUploadIndex !== 1 ? (
                <LottieView source={require('../../assets/animation/loader1.json')} autoPlay loop/>
            )
            :
            // <AppText inputText= 'Uploading'/>
            null

            } */}
        </View>
   </Modal>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',

    }
})