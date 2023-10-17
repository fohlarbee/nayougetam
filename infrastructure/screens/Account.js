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
import AppContext from '../Globals/AppContext'
import ForgetPassBottomSheet from '../components/ForgetPassBottomSheet'
import { CustomButton } from '../components/CustomButton'

import axios, {isCancel, AxiosError} from 'axios';
import  {fs}  from 'fs';
// const fs = require('fs');



const metadata = {
    contentType: 'image/png',
  };


export function Account({navigation}) {
    const [image, setImage] = useState(null);
    const [isVisible, setIsVisible] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [base64File, setBase64File] = useState(null)
    const [data, setData] = useState(null)
    const {logout} = useLogout()
  
    const handleLogout = async() => {
        await logout()
    }

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
            onPress:() => setIsVisible(true) 
    
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
    
   const selectAvater = async () => {

        try {
            const {granted} = await ImagePicker.requestCameraPermissionsAsync();
            if(!granted)
                Alert('Library permission is needed');
            if(granted){       
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    quality:0.5,
                    allowsEditing:true,
                });
                if(result.canceled)   return;
                
                setImage(result.assets[0].uri)
                setBase64File(result.assets[0].base64)
                console.log(result.assets[0])
            }    
            
        } catch (error) {
            
        }

   }
   
   const handleSubmit = async () => {
       const formData = new FormData()
        formData.append('image', {
            name:new Date() + '_profile',
            uri:image,
            type:'image',
            image: image,
        })
        console.info(formData)
        try {
            const response = await axios.post('http://192.168.0.194:4000/api/user/update_avater', formData, {
                headers:{
                    Accept:'application/json',
                    'Content-Type':'multipart/form-data',
                    authorization:'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiM2UzZjI4OGY2MjU2YWNmNmM5NWYiLCJpYXQiOjE2OTYzNjM0NDUsImV4cCI6MTY5NjYyMjY0NX0.60anX51_1biK3TtUd8cSibEVriorNjdcuv6iQYQDKjI'
                }
            })
            console.log(response)
            console.info(response.status)
            
        } catch (error) {
            console.error(error.message)
        }
        // let data = new FormData();
        //     data.append('image', fs.createReadStream(image));
        //     let config = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: 'http://192.168.0.194:4000/api/user/update_avater',
        //     headers: { 
        //         'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiM2UzZjI4OGY2MjU2YWNmNmM5NWYiLCJpYXQiOjE2OTcxOTA1MDcsImV4cCI6MTY5NzQ0OTcwN30.2VEjbdTU6V4arF-g5jS_rv22pabQQodghpchDA3I9bQ', 
        //         ...data.getHeaders()
        //     },
        //     data : data
        //     };

            // console.log(`Req: ${data}`)

            // axios.request(config)
            // .then((response) => {
            // console.log(JSON.stringify(response.data));
            // })
            // .catch((error) => {
            // console.log(error);
            // });
        /*const formData = new FormData()
        formData.append('image', {
            name:'kc_profile',
            uri:image,
            type:'image',
            image: image,
            // path:
        })
        console.info(formData)
        try {
            const response = await axios.post('http://192.168.0.194:4000/api/user/update_avater', formData, {
                headers:{
                    Accept:'application/json',
                    'Content-Type':'multipart/form-data',
                    authorization:'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiM2UzZjI4OGY2MjU2YWNmNmM5NWYiLCJpYXQiOjE2OTYzNjM0NDUsImV4cCI6MTY5NjYyMjY0NX0.60anX51_1biK3TtUd8cSibEVriorNjdcuv6iQYQDKjI'
                }
            })
            console.log(response)
            console.log(response.status)
            
        } catch (error) {
            console.error(error.message)
            
        }*/

        /*
        const axios = require('axios');
        const FormData = require('form-data');
        const fs = require('fs');
        let data = new FormData();
        data.append('image', fs.createReadStream('logo 1.png'));

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.0.194:4000/api/user/update_avater',
        headers: { 
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiM2UzZjI4OGY2MjU2YWNmNmM5NWYiLCJpYXQiOjE2OTcxOTA1MDcsImV4cCI6MTY5NzQ0OTcwN30.2VEjbdTU6V4arF-g5jS_rv22pabQQodghpchDA3I9bQ', 
            ...data.getHeaders()
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });
        */

   
       
        
      
        // console.log(formData)
        // alert(response.ok)
   }

  

//     const updateAvater = async() => {

//         const {granted} = await ImagePicker.requestCameraPermissionsAsync();
//         if(!granted) Alert('Library permission is needed');
//         if(granted){
//             try {
//                 const result = await ImagePicker.launchImageLibraryAsync({
//                     mediaTypes:ImagePicker.MediaTypeOptions.Images,
//                     quality:0.5,
//                     allowsEditing:true
//                 });
//                 if(result.canceled) return;
//                 console.log(result.assets[0])
//                 setImage(result.assets[0].uri)
//                 const blob = await new Promise((resolve, reject) => {
//                     const xhr = new XMLHttpRequest();
//                     xhr.onload = () => {
//                         resolve(xhr.response);
//                     };
//                     xhr.onerror = (e) => {
//                         reject(new TypeError("Network request failed"));
//                     };
//                     xhr.responseType = "blob";
//                     xhr.open("GET", result.assets[0].uri, true);
//                     xhr.send(null);
//                 });
//                 const store = getStorage(app)
//                 const storageRef = ref(store, `avaters/${blob.data.name}`);
//                 const response = await uploadBytes(storageRef, blob, metadata)
//                 .then(async(snapshot) => {
//                     await getDownloadURL(storageRef)
//                     .then(async(url) => {
//                         console.log(url)
//                         setImageUrl(url)
//                         const person = authentication.currentUser.uid;
//                         const updateRef = doc(db, "users",person)
//                        await updateDoc(updateRef, {
//                             avatar:url,
//                         })
//                     })
//                     .then(() => console.log('succesful'))
//                 })

//             } catch (error) {
//                 console.log(error)
//             }
//         }

//   }

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
                onPress={selectAvater}
                image={image}
                
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
                         onPress={ e.onPress ? e.onPress : () => navigation.navigate(e.targetScreen) }
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
                <ForgetPassBottomSheet isBottomSheetVisible={isVisible}/>
                <CustomButton actionText='uplaod' onPress={() => handleSubmit()}/>
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


