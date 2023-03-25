import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { Theme } from '../Theme'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function ImageInput({imageUri, onChangeImage}) {


    const requestPermission = async() => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted) Alert('Library permission is needed')
  }

    const handleSelect = () => {
        if(!imageUri) selectImage();
        else {
            Alert.alert('Delete', 'Are you sure you want to delete this Image', [
                {text:'Yes', onPress:() => onChangeImage(null)},
                {text:'no'},
            ])
        }
       
    }

    const selectImage = async() => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                quality:0.5,
            });
            if(!result.canceled) onChangeImage(result.assets[0].uri);
        
        } catch (error) {
            console.log(error);
        }
       
    }

    useEffect(() => {
        requestPermission();
      }, [])

  return (
    <TouchableWithoutFeedback onPress={handleSelect}> 
        <View style={styles.container}>
            {!imageUri && <MaterialCommunityIcons name='camera' color={Theme.colors.appLame} size={40}/>}
            {imageUri && <Image source={{uri:imageUri}} style={styles.image}/>}
        
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor:Theme.colors.light,
        borderColor:Theme.colors.appBlue,
        borderRadius:15,
        borderWidth:0.5,
        height:100,
        justifyContent:'center',
        width:100,
        overflow:'hidden'
    },
    image:{
        height:'100%',
        width:'100%'
    }
})