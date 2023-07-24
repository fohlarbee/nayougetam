import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Screen } from '../components/Screen';
import { CardComponent } from '../components/CardComponent';
import ActivityIndicator from '../components/ActivityIndicator';
import { Theme } from '../Theme';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { AppText } from '../components/AppText';
import { CustomButton } from '../components/CustomButton';

import LottieView from 'lottie-react-native';
import { Avatar,Text } from '@rneui/themed';
import { EvilIcons as Icon, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'; 
import { Card,  } from '@rneui/themed';
import { Image } from '@rneui/themed';




export function ListingsScreens({navigation}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

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
    

    useEffect(() => {
       getListings(); 


    },[] )

  return (
    <>

    <Screen style={styles.screen}>
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
        <Text h3 style={{fontWeight:'bold',marginTop:10, marginBottom:6}}>Recent</Text>
        <CardComponent image={'https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}/>
        <View style={{alignSelf:'center',flexDirection:'row'}}>
            <Octicons name='dot' size={20} color={Theme.colors.appBlue}/>
            <Octicons name='dot-fill' size={20} color={Theme.colors.appBlue} style={{marginHorizontal:9}}/>
            <Octicons name='dot-fill' size={20} color={Theme.colors.appBlue}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text h4 style={{fontWeight:'bold', marginVertical:8}}>For Students</Text>
           <Text h6 style={{fontWeight:'bold', marginTop:17, color:Theme.colors.appBlue}}>See All</Text>
        </View>
        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
           <Image style={{width:170, height:200, borderRadius:10}} source={{uri:'https://images.pexels.com/photos/3155047/pexels-photo-3155047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}>
                <MaterialCommunityIcons name='heart-circle' color='red' size={80}/>
           </Image>
           <Image style={{width:170, height:200, borderRadius:10}} source={{uri:'https://images.pexels.com/photos/3155047/pexels-photo-3155047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}/>
        </View>
        {/* <View>
            <View>
                <LottieView
                source={require('../../assets/animation/buyit.json')}
                />
            </View>
             
        </View>
         */}
        
            {/* <ActivityIndicator visible={loading}/>

    
        {isError && <>
            <AppText inputText="Couldn't retrieve Lisings"/>
            <CustomButton actionText='Retry' onPress={getListings}/>
        </>}
        
        {listings && 
        
                <FlatList
                refreshing={false}
                onRefresh={getListings}
                showsVerticalScrollIndicator={false}
                    data={listings}
                    key={listings => listings.docId}
                    renderItem={({item}) => 
                    <CardComponent
                        title={item.title}
                        subTitle={"N" + item.price}
                        description={item.description}
                        image={item.images[0]}
                        onPress={() => navigation.navigate('ListingDetails', item) }
                        
                    />
                }
                />
                
            
            
        }
            */}
    </Screen>
    </>
  )
}

const styles = StyleSheet.create({
    screen:{
        padding:20,
        backgroundColor:'#eee'
    },
   
})