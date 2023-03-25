import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL
 } from "firebase/storage";
import { useState } from "react";
 import { app } from "../firebase/firebaseConfig";

const uploadImage = async(values) => {
    const [imagesUrl, setImagesUrl] = useState([]);

    const metadata = {
      contentType: 'image/png',
    };
    try {
      const images = values.images
    images.map( async(image) => {
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
      const result = uploadBytes(storageRef, blob, metadata)
      .then((snapshot) => {
         getDownloadURL(storageRef)
        .then((url) => {
            let urls = [url];
            setImagesUrl(...images, url)
        } )
      })
    })  
    } catch (error) {
        console.log('Upload error', error)
    }
    return imagesUrl;
  }
  export default {uploadImage};