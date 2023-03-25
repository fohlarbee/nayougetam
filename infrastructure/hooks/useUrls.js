import { useContext, useState } from "react";
import { getStorage, ref, uploadBytes , getDownloadURL} from "firebase/storage";
import { app } from "../firebase/firebaseConfig";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import AuthContext from "../Globals/AppContext";
const metadata = {
    contentType: 'image/png',
  };
// const newListing = {
//         category:values.category,
//         description:values.description,
//         images:values.images,
//         by:user,
//         price:values.price,
//         title:values.title,
//         location:location
// }

const useUrls = async(values) => {
    let urls = [];
    
        const images = values.images;
        if(urls === []){
            const gettingUrls =  images.map(async(image) => {
                let blobsGlobal = [];
        
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
                    // blobsGlobal.push([...blobsGlobal, blob]);
                    // return blob
        
                    const store = getStorage(app)
                    const storageRef = ref(store, `images/${blob.data.name}`);
                    const result = await uploadBytes(storageRef, blob, metadata)
                      .then(async(snapshot) => {
                        await getDownloadURL(storageRef)
                        .then(async(url) => {
                             blobsGlobal.push(url);
                            // console.log(blobsGlobal)
                            // console.log('this is url',url)
                        })
                    })
            
                     
                        
        
                    return urls.push(blobsGlobal)
                });
                
        }else{
            console.log(urls)
        }
     
        
        


    
    
    
}
 
export default {useUrls};