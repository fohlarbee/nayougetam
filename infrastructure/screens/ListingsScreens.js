import {  FlatList, ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Screen } from '../components/Screen';
import { CardComponent } from '../components/CardComponent';
import { Theme } from '../Theme';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

import { Avatar,Text,  } from '@rneui/themed';
import { EvilIcons as Icon, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'; 
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import ProductCardData from '../components/ProductCardData,';
import Categories from '../components/Categories';




export function ListingsScreens({navigation}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imgActive, setImgActive] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    const images = [
       'https://cdn.pixabay.com/photo/2016/06/25/12/50/handbag-1478814_1280.jpg',
       'https://cdn.pixabay.com/photo/2017/09/08/07/59/bag-2728000_640.png',
       'https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261_1280.jpg'
    ]
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

    const getListings = () => {
        setIsError(false);
        setLoading(true); 
        let funcListings = [];
       const unsubscribe = onSnapshot(collection(db, 'listings'), (onSnap) => {
            onSnap.docs.forEach(item => {
                let listingsData = item.data();
                listingsData.docId = item.id
                funcListings.push(listingsData);
                setListings(funcListings)
                setLoading(false);
            }) 
        });
        // return unsubscribe();
         

    
    }
    

  

  return (
    <>

    <Screen style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} stickyHeaderHiddenOnScroll={true}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <Avatar 
                        size={64}
                        rounded
                        source={{uri:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                    />
                    <View style={{marginHorizontal:5, marginTop:6}}>
                        <Text h5 style={{fontWeight:'bold'}}>Hi,Fohlarbee</Text>
                        <Text style={{fontWeight:'200'}}>What do you need?</Text>
                    </View>
                
                </View>
                <View style={{flexDirection:'row', marginTop:7}}>
                    <Icon name='search' size={35} color='black'style={{marginRight:20}} />
                    <MaterialCommunityIcons name='bell-badge' size={30} color=''black />
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text h3 style={{fontWeight:'bold',marginTop:10, marginBottom:6}}>Recent</Text>
                <TouchableOpacity onPress={isCategoriesVisible}>
                    <Text h5 style={{fontWeight:'600',marginTop:21, marginBottom:6, color:Theme.colors.appBlue}}>Categories</Text>
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
                        resizeMode="cover"
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
           
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text h4 style={{fontWeight:'bold', marginVertical:8}}>For Students</Text>
                <Text h6 style={{fontWeight:'bold', marginTop:17, color:Theme.colors.appBlue}}>See All</Text>
            </View>
            <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', flexWrap:'wrap', marginHorizontal:10}}>
                {ProductCardData.map((e, index) => (
                    <ProductCard 
                    key={index.toString()}
                    imageUrl={e.imageUrl}
                    title={e.title}
                    subTitle={e.subTitle}
                    price={e.price}
                    />
                ))}
                {/* <FlatList
                bounces
                pagingEnabled
                horizontal
                    data={ProductCardData}
                    renderItem={({item}) => (
                        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', flexWrap:'wrap'}}>
                             <ProductCard/>
                            
                        </View>
                    )}
                /> */}
                
            </View>
            <CardComponent image={'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}/>

            <TouchableOpacity onPress={clearOnboarding}> 
                <Text>Clear Onboarding</Text>
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
        flex:1
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