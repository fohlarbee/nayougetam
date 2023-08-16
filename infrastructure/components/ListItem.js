import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText';
import { Theme } from '../Theme';
import { Swipeable } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from "@expo/vector-icons"

export function ListItem({title, subTitle, image, ImageComponent, onPress, icon, iconName,  iconColor, iconSize = 40, renderRightActions}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight
        underlayColor={Theme.colors.appLame} 
        onPress={onPress}
        >
            <View style={styles.container}>
                {ImageComponent}
                {icon && <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} style={{marginLeft:5}}/>}

               {image && <Image source={image} style={styles.image} resizeMode='cover'/>} 
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
        backgroundColor:'#fff',
        alignItems:"center",
        borderWidth:0.17,
        borderColor:'lightgrey',
        borderRadius:10,
        height:80,
        maxHeight:100,
        marginHorizontal:10,
        marginVertical:5
    },
    image:{
        width:40,
        height:40,
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
        fontWeight:'400',
        fontSize:12
    },
    listing:{
        color:"#6e6969",
        marginTop:5,
        fontSize:8
    }
})