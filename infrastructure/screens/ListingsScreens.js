import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import  Screen from '../components/Screen';

import { Avatar,Text,  } from '@rneui/themed';
import { EvilIcons as Icon, MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductCardData from '../components/ProductCardData,';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { Theme } from '../Theme';
import { ListItemV2 } from '../components/ListItemV2';





export const images = [
    'https://cdn.pixabay.com/photo/2016/06/25/12/50/handbag-1478814_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/09/08/07/59/bag-2728000_640.png',
    'https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261_1280.jpg'
 ]

export function ListingsScreens({navigation}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imgActive, setImgActive] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
   
    const isCategoriesVisible = () => {
        setIsVisible(!isVisible);
    }
    const onChange = (nativeEvent) => {
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != imgActive){
                setImgActive(slide);
                        
            }
        }
    }

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (error) {
            console.log('Error @clearOnboarding', error);
        }
    }

  return (
    <>

    <Screen style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} stickyHeaderHiddenOnScroll={true}>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:10}}>
                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <Avatar 
                        size={50}
                        rounded
                        source={{uri:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                    />
                    <View style={{marginHorizontal:5, marginTop:6}}>
                        <Text style={{fontWeight:'700', color:'#404040', fontSize:17}}>Hi,Fohlarbee</Text>
                        <Text style={{fontWeight:'200', fontSize:8}}>What do you need?</Text>
                    </View>
                
                </View>
                <View style={{flexDirection:'row', marginTop:7}}>
                    <TouchableOpacity>
                         <Icon name='search' size={25} color='#404040'style={{marginRight:10}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                         <MaterialCommunityIcons name='bell-badge' size={20} color='#404040' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:10}}>
                <Text style={{fontWeight:'500',marginTop:10, marginBottom:6, color:'#404040', fontSize:25}}>Recent</Text>
                <TouchableOpacity onPress={isCategoriesVisible}>
                    <Text  style={{fontWeight:'200',marginTop:21, marginBottom:6, color:Theme.colors.appBlue}}>Marketplace</Text>
                </TouchableOpacity>
            </View>
            <View >
                <ScrollView
                onScroll={({nativeEvent}) => onChange(nativeEvent)}
                pagingEnabled
                horizontal
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
           
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:10}}>
                <Text style={{fontWeight:'600', marginVertical:5, color:'#404040', fontSize:14}}>For students</Text>
                <Text style={{fontWeight:'500', marginTop:14, color:'#404040', fontSize:10}}>See all</Text>
            </View>
                <View>
                    <ScrollView 
                    horizontal
                    bounces={false}
                    focusable
                    scrollEventThrottle={6}
                    snapToAlignment='center'
                    showsHorizontalScrollIndicator={false}
                    
                    >
                        {ProductCardData.map((e,index) => (
                            <ProductCard
                             key={index}
                             title={e.productName}
                             subTitle={e.productDes}
                             price={e.tag}
                             imageUrl={e.imageUrl}
                             styling={{marginHorizontal:10}}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:14}}>
                    <Text style={{fontWeight:'600', marginVertical:5, color:'#404040', fontSize:14}}>Popular</Text>
                    <Text style={{fontWeight:'500', marginTop:14, color:'#404040', fontSize:10}}>See all</Text>
                </View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                    {ProductCardData.map((e,index) => (
                        <ListItemV2
                        key={index}
                            productName={e.productName}
                            tag={e.tag}
                            productImage={e.imageUrl}
                            vendorImage={e.vendorImage}
                            vendorName={e.vendorName}
                            ratings={e.rating}
                            subcribers={e.subscribers}


                        />
                    ))}
                </ScrollView>
                

            <TouchableOpacity onPress={clearOnboarding}> 
                <Text >Clear Onboarding</Text>
            </TouchableOpacity>
            <Categories isVisible={isVisible}/>

        </ScrollView>
       
    </Screen>
    </>
  )
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor:'#fff'
    },
    wrap:{
        width:Dimensions.get('window').width ,
        height:Dimensions.get('window').height * 0.25,
        overflow:"hidden",
        flex:1,
        borderRadius:10
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
   
})