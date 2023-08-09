import {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, View, Linking, Alert, Image, Text, Dimensions} from 'react-native'
import React from 'react'
import { AppText } from '../components/AppText'
import { Theme } from '../Theme'
import  Screen  from '../components/Screen';
import { images } from './ListingsScreens'
import { SubmitButton } from '../components/SubmitButton'

export function ListingDetailsScreen({route}) {
    const [imgActive, setImgActive] = useState(0);

    const onChange = (nativeEvent) => {
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != imgActive){
                setImgActive(slide);
                        
            }
        }
    }


     


    const sendWhatsAppMessage = () => {
    const phoneNumber = '+348036086147';
    const message = 'Hello, this is a message from my Expo app!';
    let url = `whatsapp://send?phone=${phoneNumber}`;
    if (Platform.OS === 'android') {
        url += `&text=${encodeURIComponent(message)}`;
    } else {
        url += `&body=${encodeURIComponent(message)}`;
    }
    // Open the WhatsApp app with the given URL
    Linking.openURL(url)
        .then((data) => {
        console.log(data)
        console.log('WhatsApp Opened');
        })
        .catch(() => {
        alert('Make sure WhatsApp is installed on your device');
        });
    };
      

    
      
 

  return (
    <Screen>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
        <View style={{}} >
                <ScrollView
                onScroll={({nativeEvent}) => onChange(nativeEvent)}
                pagingEnabled
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                
                >
                    {images.map((e, index) => 

                       ( <Image
                        key={e}
                        source={{uri:e}}
                        resizeMode='stretch'
                        style={styles.wrap}

                        />)
                    )}
                </ScrollView>
                <View style={styles.wrapDot}>
                    {images.map((e, index) => (
                    <Text key={e}
                    style={imgActive === index ? styles.dotActive : styles.dot}
                    >
                        ●
                    </Text>

                    ))}

                </View>
            </View>
            <View style={{alignContent:'flex-start', flex:1}}>
                <SubmitButton color='red' />
            </View>
           
        </ScrollView>
    </Screen>

  )
}

const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:300
    },
    detailsContainer:{
        marginTop:10,
        padding:20
    },
    desc:{
        fontWeight:'bold',
        fontSize:30,
        color:Theme.colors.appLameS,
        marginTop:5
    },
    title:{
        fontSize:30,
    },
    price:{
        fontSize:20,
        marginTop:10,
        color:Theme.colors.primary
    },
    btn:{
        marginBottom:40
    },
    wrap:{
        width:Dimensions.get('window').width ,
        height:Dimensions.get('window').height * 0.5,
        overflow:"hidden",
        flex:1,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
    },
    wrapDot:{
        position:'absolute',
        flexDirection:'row',
        bottom:0,
        alignSelf:'center',
        marginVertical:5,
        marginLeft:50
    },
    dotActive:{
        marginHorizontal:4,
        color:Theme.colors.appBlue,
        fontSize:10

    },
    dot:{
        marginHorizontal:4,
        color:'#fff',
        fontSize:10

    },
});