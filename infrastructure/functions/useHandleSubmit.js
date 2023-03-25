import React,{ useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase/firebaseConfig";

  const useHandleSubmit = (values,location, resetForm) => {
        const [imagesUrl, setImagesUrl] = useState([]);
        // console.log(imagesUrl)
        const words = () =>{
            console.log('this is it')
        }


    // const getUrls = async () => {
    //     const metadata = {
    //         contentType: 'image/png',
    //     };

    //     const images = values.images;
    //     images.map(async(image) => {
            
    //         const blob = await new Promise((resolve, reject) => {
    //                     const xhr = new XMLHttpRequest();
    //                     xhr.onload = () => {
    //                         resolve(xhr.response);
    //                     };
    //                     xhr.onerror = (e) => {
    //                         reject(new TypeError("Network request failed"));
    //                     };
    //                     xhr.responseType = "blob";
    //                     xhr.open("GET", image, true);
    //                     xhr.send(null);
    //                 });
    //             setImagesUrl(blob);
    //         ////uploading blob to storage
    //         // const store = getStorage(app)
    //         // const storageRef = ref(store, `images/${blob.data.name}`);
    //         // const result = uploadBytes(storageRef, blob, metadata).then(() => {
    //         //     console.log('upload done')
    //         // })
    //     })
    //     getUrls();
    //     console.log(imagesUrl)
    //     return imagesUrl;
    // }
            
            

    // const uploadImage = async(values) => {
    //     const [imagesUrl, setImagesUrl] = useState([]);
    
    //     const metadata = {
    //       contentType: 'image/png',
    //     };
    //     try {
    //       const images = values.images
    //       ///creating a blob
    //     images.map( async(image) => {
    //       const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload = () => {
    //             resolve(xhr.response);
    //         };
    //         xhr.onerror = (e) => {
    //             reject(new TypeError("Network request failed"));
    //         };
    //         xhr.responseType = "blob";
    //         xhr.open("GET", image, true);
    //         xhr.send(null);
    //     });
    //     ////uploading blob to storage
    //       const store = getStorage(app)
    //       const storageRef = ref(store, `images/${blob.data.name}`);
    //       const result = uploadBytes(storageRef, blob, metadata)
    //       ////getting url of uploaded blob
    //       .then((snapshot) => {
    //          getDownloadURL(storageRef)
    //         .then((url) => {
    //             let urls = [url];
    //             setImagesUrl(...images, url)
    //         } )
    //       })
    //     })  
    //     } catch (error) {
    //         console.log('Upload error', error)
    //     }
    //     return imagesUrl;
    //   }
    // try {
    //   setPosting('Uploading...')
    //   setTimeout(() => {
    //      setOnUpload(true);
        
    //   }, 4000);
    //   const result =  await addDoc(collection(db, 'listings'), {
    //     category:values.category,
    //     description:values.description,
    //     images:values.images,
    //     by:user,
    //     price:values.price,
    //     title:values.title,
    //     location:location
    //   })
    //   .then(() => {
    //     showNotification();
    //     Alert.alert('Success', 'Listing created!!!', [
    //       {text:'OK', onPress:() => {
    //         setOnUpload(false)
    //         setPosting('Upload')}
    //       }
    //     ])
    //   })
    //   if(result === null) return alert('Unable to create Listing')

    //   console.log('succesful');   
  
    // } catch (error) {
    //   setOnUpload(false);
    // } 

    // resetForm();
   };
   export default useHandleSubmit;