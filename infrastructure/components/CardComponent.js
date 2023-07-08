import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Theme } from '../Theme'
import { AppText } from './AppText'
import { TouchableWithoutFeedback } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";

export function CardComponent({image, title, subTitle, onPress, description}) {
  return (
    <TouchableWithoutFeedback >
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:image}} />
            <View style={styles.detailsContainer}>
                <View style={{marginLeft:"auto", alignSelf:"center"}}>
                    <MaterialCommunityIcons 
                    name="arrow-expand-all" 
                    size={35} 
                    onPress={onPress}
                    color={Theme.colors.appDull} />
                </View>
                <View>
                    <AppText stylesLing={styles.title} inputText={title}></AppText>
                    <AppText
                    stylesLing={styles.subTitle} 
                    inputText={subTitle}
                    >
                    </AppText>
                    <AppText stylesLing={styles.desc} inputText={description}/>
                </View>
                
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
        padding:20,
        // display:'flex'

    },
    title:{
        fontSize:30
    },
    subTitle:{
        marginTop:10,
        color:Theme.colors.primary,
        backgroundColor: Theme.colors.appBlue,
        width:80,
        maxWidth:150,
        borderRadius:6,
        textAlign:'center'
    },
    desc:{
        marginTop:5,
        color:Theme.colors.appLameS
    }
})