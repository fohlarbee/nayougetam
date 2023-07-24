import {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, View, Linking, Alert} from 'react-native'
import React from 'react'
import { AppText } from '../components/AppText'
import { Theme } from '../Theme'
import { ListItem } from '../components/ListItem'
import { Screen } from '../components/Screen';
import { doc,getDoc,onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
import { CustomButton } from '../components/CustomButton'
import { CustomSwip } from '../components/CustomSwip'

export function ListingDetailsScreen({route}) {
    const Listing = route.params
    const [presentImage, setPresentImage] = useState(Listing.images[0]);
    const [counter, setCounter] = useState(0);
    const [image,setImage] = useState(null);
    const [number, setNumber] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
     
    const getAvater = async () => {
        const person = Listing.by;
        const yeep = person.toString();

        console.log(yeep)
        const docRef = doc(db, 'users',person);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())

        // const docSnap =await getDoc(docRef);
        // console.log(docSnap)
        // setUserName(docSnap.data().username)
        // setImage(docSnap.data().avatar);
        // setNumber(docSnap.data().number)
        // setEmail(docSnap.data().email)
        }
    useEffect(() => {
        getAvater();
     },[])

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
        <ScrollView showsVerticalScrollIndicator={false}>
            <CustomSwip
                image={presentImage}
                renderLeftActions={() => {
                if (Listing.images.length > counter) {
                    setPresentImage(Listing.images[counter + 1])
                    setCounter(counter +1)

                    } 
                    if(Listing.images.length -1  === counter){
                    setPresentImage(Listing.images[0])
                    setCounter(0)

                    }
                }}     
                renderRightActions={() => {
                    if (Listing.images.length > counter) {
                    setPresentImage(Listing.images[counter + 1])
                    setCounter(counter +1)

                    } 
                    if(Listing.images.length -1  === counter){
                    setPresentImage(Listing.images[0])
                    setCounter(0)

                    }
                }}
            />
            <View style={styles.detailsContainer}>
                <AppText stylesLing={styles.title} inputText={Listing.title}/>
                <AppText stylesLing={styles.price} inputText={'N' + Listing.price}/>
                <AppText stylesLing={styles.desc} inputText={Listing.description}/>

            </View>
            <View style={{ marginTop:40}}/>
            <ListItem title= {userName} subTitle={email} image={image}/>
            <CustomButton styling={styles.btn} 
            // onPress={openWhatsAppChat}
            onPress={sendWhatsAppMessage}
            actionText='Contact Seller'
            />
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
    }
});