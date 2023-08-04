import { StyleSheet, View, Animated,useWindowDimensions } from 'react-native'
import React from 'react'
import { Theme } from '../Theme'
import slides from './slides'

export default function Paginator({data, scrollX}) {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection:'row', height:64}}>
        {data.map((item, i) => {

          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange:[10,20,10],
            extrapolate:'clamp'
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange:[0.3, 1, 0.3],
            extrapolate:'clamp'
          })
            return (<Animated.View style={{width:dotWidth,height:10, borderRadius:5,marginHorizontal:8, backgroundColor:Theme.colors.appBlue, opacity}}key={i.toString()}/>)
        })}
        
    </View>
  )
}

const styles = StyleSheet.create({
   
})