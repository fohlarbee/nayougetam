import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { Theme } from '../Theme';


const OnboardingItem = ({item}) => {

    const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
        <Image source={item.image} style={[styles.image, {width, resizeMode:'contain'}]}/>
        <View style={{flex:0.3}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        flex:0.7,
        justifyContent:'center'
    },
    title:{
        fontWeight:'800',
        fontSize:28,
        marginBottom:10,
        textAlign:'center',
        color:Theme.colors.appBlue
        
    },
    description:{
        fontWeight:'300',
        textAlign:'center',
        paddingHorizontal:64,
        color:'#62656b'
    }
})

export default OnboardingItem