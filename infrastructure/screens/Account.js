import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Screen } from '../components/Screen'
import { ListItem } from '../components/ListItem'
import { Theme } from '../Theme'
import { Icon } from '../components/Icon'
import ListItemSeparator from '../components/ListItemSeparator'
import AuthContext from '../Globals/AppContext'
import storage from '../auth/storage';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, authentication, db } from '../firebase/firebaseConfig'
import { updateDoc, doc, getDoc } from 'firebase/firestore'



const metadata = {
    contentType: 'image/png',
  };

const menuItem = [
    {
        title:"My Listinings",
        icon:{
            name:"format-list-bulleted",
            backgroundColor:Theme.colors.appDull

        },
        targetScreen:'MyListings'
    },
    {
        title:"Messages",
        icon:{
            name:"email",
            backgroundColor:Theme.colors.appLameS

        },
        targetScreen :'Messages'
    },
]
export function Account({navigation}) {
    const {user, setUser, setUserLoggedIn} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    
    const getAvater = async () => {
        const person = authentication?.currentUser?.uid;
        const docRef = doc(db, 'users',person);
        const docSnap =await getDoc(docRef);
        setImage(docSnap.data().avatar);
    }

   

    useEffect(() => {
       getAvater();
    },[])

    const updateAvater = async() => {

        const {granted} = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted) Alert('Library permission is needed');
        if(granted){
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    quality:0.5,
                    allowsEditing:true
                });
                if(result.canceled) return;
                console.log(result.assets[0])
                setImage(result.assets[0].uri)
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", result.assets[0].uri, true);
                    xhr.send(null);
                });
                const store = getStorage(app)
                const storageRef = ref(store, `avaters/${blob.data.name}`);
                const response = await uploadBytes(storageRef, blob, metadata)
                .then(async(snapshot) => {
                    await getDownloadURL(storageRef)
                    .then(async(url) => {
                        console.log(url)
                        setImageUrl(url)
                        const person = authentication.currentUser.uid;
                        const updateRef = doc(db, "users",person)
                       await updateDoc(updateRef, {
                            avatar:url,
                        })
                    })
                    .then(() => console.log('succesful'))
                })

            } catch (error) {
                console.log(error)
                // throw Error('something happened', error)
            }
        }

  }
////////////////////////////////////////////
    const logOut = async() => {
        setUserLoggedIn(null);
        storage.removeToken();         
     }
/////////////////////////////////////////////
  return (
    <Screen style={styles.screen}>
        <View style={styles.container}>
            <ListItem 
                title="Folaranmi Olnarewaju" 
                subTitle={user.email}
                ImageComponent={
                <Icon name='account' size={70} 
                backgroundColor={Theme.colors.appBlue}
                onPress={updateAvater}
                image={image}
                />}
                />
            
        </View>
        <View style={styles.container}>
            <FlatList
                data={menuItem}
                keyExtractor={menuItem => menuItem.title}
                renderItem={({item}) => (
                    <ListItem 
                    title={item.title} 
                    ImageComponent={<Icon name={item.icon.name} 
                    backgroundColor={item.icon.backgroundColor}
                    
                     />
                    }
                    onPress={() => navigation.navigate(item.targetScreen) }
                     />
                )}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </View>
        <ListItem title="Log Out" ImageComponent={<Icon name="logout" backgroundColor='#ff66ed'/>} onPress={logOut}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
    },
    screen:{
        backgroundColor:Theme.colors.light

    }
})


