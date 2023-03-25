import { Alert, ScrollView, StyleSheet} from 'react-native'
import React, { useContext, useState} from 'react'
import { Screen } from '../components/Screen';
import { AppFormField } from '../components/AppFormField';
import { AppFormPicker } from '../components/AppFormPicker';
import { SubmitButton } from '../components/SubmitButton';
import AppForm from '../components/AppForm';
import CategoryPickerItem from '../components/CategoryPickerItem';

import * as Yup from "yup";
import FormImagePicker from '../components/FormImagePicker';
import { addDoc, collection } from 'firebase/firestore';
import { app, db } from '../firebase/firebaseConfig';
import useLocation from '../hooks/useLocation';
import AuthContext from '../Globals/AppContext';
import { loadoadScreen } from '../components/UploadScreen';
import ActivityIndicator from '../components/ActivityIndicator';
import * as Notifications from 'expo-notifications';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';


const categories = [
    {label:"Funiture", value:1, backgroundColor:"#40513B", icon:"table-furniture"},
    {label:"Clothings", value:2, backgroundColor:"green", icon:"tshirt-crew"},
    {label:"Stationary", value:3, backgroundColor:"#A459D1", icon:"book"},
    {label:"Bicycles", value:4, backgroundColor:"#4D455D", icon:"lock"},
    {label:"Bicycles", value:5, backgroundColor:"#E96479", icon:"lock"},
    {label:"Bicycles", value:6, backgroundColor:"#7DB9B6", icon:"lock"},
    {label:"Bicycles", value:7, backgroundColor:"orange", icon:"lock"},
    {label:"Bicycles", value:8, backgroundColor:"purple", icon:"lock"},
    {label:"Bicycles", value:9, backgroundColor:"#F5E9CF", icon:"lock"},
]

const validationSchema = Yup.object().shape({
  title:Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description:Yup.string().required().min(10).label("Description"),
  category:Yup.object().required().nullable().label("Category"),
  images:Yup.array().min(1, 'Please select at lease one Image'),
});

const showNotification = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const permission = await Notifications.getPermissionsAsync();
  if(permission.granted) {
      const notf = await Notifications.scheduleNotificationAsync(
        {content:{
          title:'New Listing',
          body:'Your listing has been created',
          data:{_displayInForeground:true}, 
          }, 
        trigger:null});
  }
}
const metadata = {
  contentType: 'image/png',
};

export function ListingEditScreen() {
    // const [category, setCategory] = useState();
    const [onUpload, setOnUpload] = useState(false);
    const [onUploadIndex, setOnUploadIndex] = useState(0);
    const {user} = useContext(AuthContext);
    const [posting, setPosting] = useState('Upload')
    const [imagesUrls, setImagesUrls] = useState([])
    // console.log('this is imagesurls',imagesUrls) 
    const location = useLocation();
  
    // console.log(blobs)

  

  const handleUpload = async (values) => {
    try {
      
      if(imagesUrls !== []){
        setOnUpload(true)
        setImagesUrls([])
        const images = values.images;
        images.map(async(image) => {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (e) => {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });
        
        const store = getStorage(app)
        const storageRef = ref(store, `images/${blob.data.name}`);
        const result = await uploadBytes(storageRef, blob, metadata)
          .then(async(snapshot) => {
            let local = [];
            await getDownloadURL(storageRef)
            .then(async(url) => {
              // setImagesUrls([...imagesUrls, url])
              imagesUrls.push(url) //use this
              // setImagesUrls(imagesUrls,url)
              // local.push(url)
            })
            // setImagesUrls(...imagesUrls,local);
        })
        })
    
    }else{
      alert("can't upload listing, try again");
    }
    } catch (error) {
      setOnUpload(false);
      alert("Error while trying to upload listing");
    }
   
  }
  const handleSubmit = async (values) => {
    try {
      if(imagesUrls.length >= 1){
        setOnUpload(true);
        const result =  await addDoc(collection(db, 'listings'), {
          category:values.category,
          description:values.description,
          images:imagesUrls,
          by:user,
          price:values.price,
          title:values.title,
          location:location
        })
        .then(() => {
          setOnUpload(false)
          alert('Listing has been created');
          showNotification();
        })
      }else {
        setOnUpload(false);
        alert('Error, connecting to server');
  
      }
     
    } catch (error) {
      setOnUpload(false);
      alert('Error, connecting to server');

    }
   
  }
   




   

  return (
    <>
      <Screen style={styles.container}>
        <ActivityIndicator visible={onUpload}/>

        <ScrollView>
          <AppForm

              initialValues={{
                title:"",
                price:"",
                description:"",
                category:null,
                images:[]
              }}
              onSubmit={async(values, {resetForm}) => {
                await handleUpload(values)
                setTimeout(() => {
                  handleSubmit(values)
                }, 10000);
                  //  useUrls.useUrls(values)
                // setTi meout(() => {
                //  const urls = useHandleSubmit(values)

                  // handleSubmit(values,location, resetForm)
                  // console.log(values.images)
                  // handleSubmit(values);
                // }, 3000);
              }}
              validationSchema={validationSchema}
          >
            <FormImagePicker name='images'/>
            <AppFormField maxLength={255} name="title" placeholder="Title"/>
            <AppFormField
                keyboardType="numeric"
                maxLength={8}
                name="price"
                placeholder="Price"
                width={120}
            />
            <AppFormPicker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              icon="apps"
              width="50%"
            />
            <AppFormField
            maxLength={255}
            multiline
            name="description"
            placeholder="Description"
            numberOfLines={3}
            />
            <SubmitButton actionText='Upload' styling={styles.btn} />
          
              
          </AppForm>
          </ScrollView>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  btn:{
    marginBottom:50
  }
})