import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from '../components/AppText'
import { FocusedStatusBar } from '../components/FocusedStatusBar'
import { Theme } from '../Theme'
import { ListItem } from '../components/ListItem'
import { Screen } from '../components/Screen'

export function ListingDetailsScreen({route}) {
    const Listing = route.params
    console.log(Listing.by)
  return (
    <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{uri:Listing.images[0]}} style={styles.image}/>
            <View style={styles.detailsContainer}>
                <AppText stylesLing={styles.title} inputText={Listing.title}/>
                <AppText stylesLing={styles.price} inputText={'N' + Listing.price}/>
                <AppText stylesLing={styles.desc} inputText={Listing.description}/>

            </View>
            <View style={{ marginTop:40}}/>
            <ListItem title= "Samuel Olanrewaju" subTitle="4 Listings" />
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
    }
});