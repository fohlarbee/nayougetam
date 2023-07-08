import { View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { ListItem } from '../components/ListItem'

import { Swipeable, TouchableHighlight } from 'react-native-gesture-handler';
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons"
import {SimpleLineIcons as Icons} from "@expo/vector-icons"
import { Theme } from '../Theme';

const Test = ({ImageComponent, image, renderLeftActions, renderRightActions}) => {
  return (
    <View renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}> 
       <TouchableHighlight underlayColor={Theme.colors.appLame}>
       <View style={styles.container}>
                {ImageComponent}
               {/* {image && <Image source={{uri:image}} style={styles.image}/>}  */}
               {image && <ImageBackground source={{uri:image}} style={styles.image}>
                    <View style={styles.holder}>
                        <TouchableOpacity 
                        style={{backgroundColor:"rgba(0,0,0,0.2)"}}
                        onPress={renderRightActions}
                        >
                           <Icons name="arrow-left" size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={{backgroundColor:"rgba(0,0,0,0.2)"}}
                           onPress={renderLeftActions}
                        >
                           <Icons name="arrow-right" size={30} />
                        </TouchableOpacity>
                    </View>
                   
                </ImageBackground>}
                <View style={styles.ownerHolder}>
                    {/* <AppText inputText={title} stylesLing={styles.name} numberOfLines={1} /> */}
                   {/* {subTitle && <AppText inputText={subTitle} stylesLing={styles.listing} noOfLines={2}/>} */}
                    
                </View>
                {/* <MaterialCommunityIcons name='chevron-right' size={20} color={Theme.colors.dark}/> */}
        </View>

       </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginVertical:0,
        backgroundColor:Theme.colors.white,
        alignItems:"center",
    },
    image:{
        width:"100%",
        height:300,
        borderRadius:10,
    },
    holder:{
        display:"flex",
        flexDirection:'row',
        justifyContent:"space-between",
        top:150

    }

})
export default Test