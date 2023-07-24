import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText';
import { Theme } from '../Theme';
import { Swipeable } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from "@expo/vector-icons"

export function ListItem({title, subTitle, image, ImageComponent, onPress, renderRightActions}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight
        underlayColor={Theme.colors.appLame} 
        onPress={onPress}
        >
            <View style={styles.container}>
                {ImageComponent}
               {image && <Image source={{uri:image}} style={styles.image}/>} 
                <View style={styles.ownerHolder}>
                    <AppText inputText={title} stylesLing={styles.name} numberOfLines={1} />
                   {subTitle && <AppText inputText={subTitle} stylesLing={styles.listing} noOfLines={2}/>}
                    
                </View>
                <MaterialCommunityIcons name='chevron-right' size={20} color={Theme.colors.dark}/>
            </View>
        </TouchableHighlight>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginVertical:0,
        // marginVertical:15,
        backgroundColor:Theme.colors.white,
        alignItems:"center",
        marginHorizontal:10
    },
    image:{
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10
    },
    ownerHolder:{
        flex:1,
        marginTop:10,
        marginHorizontal:15,
        justifyContent:"center"
    },
    name:{
        fontWeight:"bold",
    },
    listing:{
        color:"#6e6969",
        marginTop:5
    }
})