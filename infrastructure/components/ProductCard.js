import { StyleSheet, View, ImageBackground,  } from 'react-native'
import React from 'react'
import { EvilIcons} from '@expo/vector-icons'
import {Image, Text} from '@rneui/themed'

export default function ProductCard({imageUrl,title, subTitle, price}) {
  return (
    <>
    <View style={{marginVertical:10}}>
      <Image style={{width:140, height:200, borderRadius:10}}  source={{uri:imageUrl}}>
          <View style={{width:30, height:30, backgroundColor:'#A8A196', borderRadius:10, justifyContent:'center', alignItems:'center', marginTop:7, marginHorizontal:6}}>
            <EvilIcons name='heart' color='#fff' size={30} style={{alignSelf:'center'}}/>
          </View>
      </Image>
      <View style={{alignSelf:'center'}}>
         <Text h5 style={{fontWeight:'bold', textAlign:'center'}}>{title}</Text>
         <Text h5 style={{fontWeight:'200', textAlign:'center'}}>{subTitle}</Text>
         <Text h5 style={{fontWeight:'200', textAlign:'center'}}>{price}</Text>
      </View>
     
    </View>
    
   
  
   </>
  )
}

const styles = StyleSheet.create({})