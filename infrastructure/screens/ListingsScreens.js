import { FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Screen } from '../components/Screen';
import { CardComponent } from '../components/CardComponent';
import ActivityIndicator from '../components/ActivityIndicator';
import { Theme } from '../Theme';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { AppText } from '../components/AppText';
import { CustomButton } from '../components/CustomButton';


export function ListingsScreens({navigation}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getListings = () => {
        setIsError(false);
        // setLoading(true);
        let funcListings = [];
       let result = onSnapshot(collection(db, 'listings'), (onSnap) => {
            onSnap.forEach(item => {
                let listingsData = item.data();
                listingsData.docId = item.id
                funcListings.push(listingsData);
                setListings(funcListings)
                // setLoading(false);
            }) 

        }, (error) => {
            if(error){ 
                setLoading(false);
                setIsError(true);
            };
            // else setIsError(false);
         }) 

    
    }
    

    useEffect(() => {
       getListings(); 

    },[] )

  return (
    <>

        <Screen style={styles.screen}>
             <ActivityIndicator visible={loading}/>

        
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
            
        </Screen>
    </>
  )
}

const styles = StyleSheet.create({
    screen:{
        padding:20,
        backgroundColor:Theme.colors.light
    },
   
})