import React from 'react'
import LottieView from 'lottie-react-native';


export default function ActivityIndicator({visible = false}) {
    if(!visible) return null;
    return (
        <LottieView
            source={require('../../assets/animation/loader2.json')}
            autoPlay
            loop
            style={{zIndex:2, backgroundColor:'#fff', opacity:0.8}}
        />
    )
}
