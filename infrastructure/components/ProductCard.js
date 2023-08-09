import { StyleSheet, View, useWindowDimensions  } from 'react-native'
import React from 'react'
import { EvilIcons} from '@expo/vector-icons'
import {Image, Text} from '@rneui/themed'
import { Theme } from '../Theme'

export default function ProductCard({imageUrl,title, subTitle, price, styling}) {
  const {width, height} = useWindowDimensions()
  const cardWidth = width * 0.4
  return (
    <>
    <View style={[styling, {marginVertical:10, width:cardWidth}]}>
      <Image style={{width:cardWidth, height:150, borderRadius:10}}  source={imageUrl}>
          <View style={{width:30, height:30, backgroundColor:'#A8A196', borderRadius:10, justifyContent:'center', alignItems:'center', marginTop:7, marginHorizontal:6}}>
            <EvilIcons name='heart' color='#fff' size={30} style={{alignSelf:'center'}}/>
          </View>
      </Image>
      <View style={{alignSelf:'center'}}>
         <Text numberOfLines={1}  ellipsizeMode='clip' style={{fontWeight:'400', textAlign:'center', color:'#404040'}}>{title.substring(0,17)}</Text>
         <Text numberOfLines={1}  ellipsizeMode='clip'  style={{fontWeight:'200', textAlign:'center',fontSize:10.5}}>{subTitle.substring(0,17)}</Text>
         <Text numberOfLines={1}  ellipsizeMode='clip'  style={{fontWeight:'700', textAlign:'center', fontSize:9, color:Theme.colors.appBlue}}>{price.substring(0,13)}</Text>
      </View>
     
    </View>
    
   
  
   </>
  )
}

const styles = StyleSheet.create({})