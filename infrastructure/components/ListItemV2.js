import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import {Swipeable} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme } from '../Theme';


export function ListItemV2({productName, productImage, vendorImage, vendorName, tag, ratings, subcribers,  onPress, renderRightActions}) {
  return (
    <GestureHandlerRootView>
         <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight>
                <View style={styles.container}>
                    <View style={{flexDirection:'row', flex:1}}>
                        <Image
                        source={productImage}
                        style={{width:90, height:78, flexShrink:0, borderRadius:8}}
                        />
                        <View>
                            <Text numberOfLines={1} ellipsizeMode='head' style={styles.courseName}>{productName.substring(0,17)}</Text>
                            <View style={{flexDirection:'row', marginLeft:20, marginVertical:5}}>
                                <Image
                                source={vendorImage}
                                style={{width:30, height:30, position:'relative', resizeMode:'cover', borderRadius:15, flexShrink:0}}
                                />
                                <Text style={styles.tutor}>{vendorName.substring(0,17)}</Text>
                                <View style={{flexDirection:'row', marginLeft:20, marginTop:5.5, justifyContent:'space-between'}}>
                                    <Text style={styles.courseTag}>{tag.substring(0,13)}</Text>
                                   
                                </View>

                            </View>
                            <Text style={styles.duration}>{ratings} <Text>{subcribers}</Text></Text>
                           
                        </View>
                        
                    </View>
                    <View style={{}}>
                         <MaterialCommunityIcons name='chevron-right' size={30} style={{marginRight:0}} color={Theme.colors.appBlueV2}/>
                    </View>
                   

                </View>
       
        </TouchableHighlight>
    </Swipeable>
    </GestureHandlerRootView>
   
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginVertical:0,
        alignItems:"center",
        marginHorizontal:10,
        marginVertical:7,
        borderWidth:0.3,
        alignItems:'center',
        padding:10,
        backgroundColor:'#fff',
        width:'95%',
        maxWidth:'100%',
        maxHeight:400,
        borderRadius:10,
        borderColor:'#B1B0B0',
        flex:1
    },
    image:{
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10
    },
    tutor:{
        color: '#404040',
        fontSize: 10,
        fontWeight: '400',   
        marginHorizontal:3,
        marginVertical:5,
        flex:1
      },
      courseName:{
        fontSize:10,
        fontWeight:'700',
        color:'#404040',
        marginLeft:20,
        marginBottom:5,
        fle:1
      },
      courseTag:{
        fontSize:10,
        color:Theme.colors.appBlue,
        fontWeight:'700',
    
      },
      tutor:{
        color: '#404040',
        fontSize: 10,
        fontWeight: '400',   
        marginHorizontal:3,
        marginVertical:5,
      },
      duration:{
        color: '#404040',
        fontSize: 10,
        fontWeight: '400',   
        marginHorizontal:20,
        marginVertical:5
    
      }
})