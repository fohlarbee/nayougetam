import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { ImageInput } from './ImageInput'

export function ImageInputList({imageUris = [], onRemoveImage, onAddImage}) {
    const scrollView = useRef();

  return (
    <View>
        <ScrollView horizontal ref={scrollView} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
            <View style={styles.container}>
            {imageUris.map(uri => (
                <View style={styles.image}  key={uri}>
                    <ImageInput 
                    imageUri={uri} 
                    onChangeImage= {() => onRemoveImage(uri)}
                    /> 
                </View>
            
            ))}
                <ImageInput onChangeImage={uri => onAddImage(uri)}/>
            
            </View>
        </ScrollView>
    </View>

     
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    image:{
        marginRight:10
    }
})