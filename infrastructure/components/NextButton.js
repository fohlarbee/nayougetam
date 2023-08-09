import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native'
import React, {useEffect, useRef} from 'react'
import Svg, { G, Circle } from 'react-native-svg';
import { Theme } from '../Theme';
import {AntDesign } from '@expo/vector-icons'

export default function NextButton({percentage, scrollTo}) {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = (size / 2) - (strokeWidth /2);
    const circumfrence = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration:250,
            useNativeDriver:true
        }).start()
    }

    useEffect(() => {
      animation(percentage)
    
     
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumfrence - (circumfrence * value.value) / 100;

            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        }, [percentage]);
        
        return () => {
            progressAnimation.removeAllListener();
        }

    }, [])
    
  return (
    <View style={styles.container}>
        <Svg width={size} height={size}>
            <G fill='#fff' rotation='-90'origin={center}>
                <Circle  stroke={Theme.colors.appBlue} cx={center} cy={center} r={(radius)} strokeWidth={strokeWidth}/>
                <Circle
                ref={progressRef}
                stroke={Theme.colors.appBlue}
                cx={center}
                cy={center}
                r={(radius)}
                strokeWidth={strokeWidth}
                strokeDasharray={circumfrence}
                // strokeDashoffset={circumfrence - (circumfrence * 25) / 100}
                />
            </G>
            
        </Svg>
        <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.3}>
                <AntDesign name='arrowright' size={32} color='#fff'/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    button:{
        position:'absolute',
        backgroundColor:Theme.colors.appBlue,
        borderRadius:100,
        padding:20,
        alignSelf:'center'
    }
})