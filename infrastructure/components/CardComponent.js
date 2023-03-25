import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Theme } from '../Theme'
import { AppText } from './AppText'
import { Screen } from './Screen'
import { TouchableWithoutFeedback } from 'react-native'
export function CardComponent({image, title, subTitle, onPress, description}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:image}} />
            <View style={styles.detailsContainer}>
                <AppText stylesLing={styles.title} inputText={title}></AppText>
                <AppText stylesLing={styles.subTitle} inputText={subTitle}></AppText>
                <AppText stylesLing={styles.desc} inputText={description}/>

            </View>
        </View>
    </TouchableWithoutFeedback>
        
    
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Theme.colors.white,
        borderRadius:15,
        marginBottom:20,
        overflow:"hidden"
    },
    image:{
        height:200,
        width:'100%'
    },
    detailsContainer:{
        padding:20
    },
    title:{
        fontSize:30
    },
    subTitle:{
        marginTop:10,
        color:Theme.colors.primary
    },
    desc:{
        marginTop:5,
        color:Theme.colors.appLameS
    }
})