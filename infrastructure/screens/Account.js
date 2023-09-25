import { StyleSheet, View , Text, ScrollView, Alert} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import  Screen  from '../components/Screen'
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
import { useLogout } from '../hooks/useLogout'



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
            name:"email-outline",
            backgroundColor:Theme.colors.appLameS

        },
        targetScreen :'Messages'
    },
    {   title:'Change Password',
        icon:{
            name:'lock-outline',
            backgroundColor:'red'
        },
        targetScreen:'ChangePass'

    },
    {   title:'Notifications',
        icon:{
            name:'bell-outline',
            backgroundColor:'#79155B'
        },
        targetScreen:'Notification'

    },
    {   title:'Security',
        icon:{
            name:'shield-account-outline',
            backgroundColor:'#614BC3'
        },
        targetScreen:'Security'

    },
    {   title:'Language',
        icon:{
            name:'google-earth',
            backgroundColor:'#765827'
        },
        targetScreen:''

    },
    

    
]
export function Account({navigation}) {
    // const {user, setUser, setUserLoggedIn} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const {logout} = useLogout()
    // const [userName, setUserName] = useState('');
    
    // const getAvater = async () => {
    //     // const person = authentication?.currentUser?.uid;
    //     const docRef = doc(db, 'users',person);
    //     const docSnap =await getDoc(docRef);
    //     setUserName(docSnap.data().username)
    //     setImage(docSnap.data().avatar);
    // }
    const handleLogout = async() => {
        await logout( )
    }

   

    // useEffect(() => {
    //    getAvater();
    // },[])

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
            }
        }

  }
////////////////////////////////////////////
    // const logOut = async() => {
    //     setUserLoggedIn(null);
    //     storage.removeToken()
        
    //  }
/////////////////////////////////////////////
  return (
    <Screen style={styles.screen}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={{marginHorizontal:20, fontSize:15, fontWeight:'500', marginBottom:10}}>General</Text>
            <ListItem 
                title='Edit profile' 
                // subTitle={user.email}
                ImageComponent={
                <Icon name='account-edit' size={70} 
                backgroundColor={Theme.colors.appBlue}
                onPress={updateAvater}
                
                />}
                />
                    {menuItem.map((e, index) => (
                         <ListItem key={index}
                         title={e.title} 
                         arrow
                         ImageComponent={<Icon name={e.icon.name} 
                         backgroundColor={e.icon.backgroundColor}
                         
                          />
                         }
                         onPress={() => navigation.navigate(e.targetScreen) }
                          />
                        

                    ))}
            <Text style={{marginHorizontal:20, fontSize:15, fontWeight:'300', marginBottom:10}}>Preferences</Text>
            <ListItem
                title='Help & Support '
                ImageComponent={<Icon name='help-rhombus-outline' iconColor=''
                backgroundColor='#fff'
                />
                }
                onPress={() => navigation.navigate('') }
                />
            <ListItem
                title='Log out'
                ImageComponent={<Icon name='logout' iconColor='red'
                backgroundColor='#fff'
                />
                }
                onPress={() => Alert.alert('Loging out','Are you sure you want to logout?', [
                    { text:'Cancel' },
                    {text:'Logout', onPress:() => handleLogout()},
            ]) }
                />
        </ScrollView>
     
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:5,
    },
    screen:{
        backgroundColor:'#fff'

    }
})


