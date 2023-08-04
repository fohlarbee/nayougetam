import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { ListItem } from "../components/ListItem"
import ListItemSeparator from "../components/ListItemSeparator"
import { authentication, db } from "../firebase/firebaseConfig"
import AuthContext from "../Globals/AppContext";
import { Dimensions, View } from "react-native"


export function MyListings() {
    const [listings, setListings] = useState([]);
    const user = authentication?.currentUser?.uid;
    const height = Dimensions.get("window").height

    

    const myListings = async() => {
        let lists = [];
        const q = collection(db,'listings');
        const filter = query(q, where('by', '==', user));
      const unsubscribe =  onSnapshot(filter, (onSnap) => {
            onSnap.forEach(item => {
                console.log(item.data());
                lists.push(item.data());
                console.log(lists)
                setListings(lists);

            })
        })
    //    return unsubscribe();
        
    }
   useEffect(() => {
    myListings();
   },[])
  return (
    <>
    {listings != [] ?
    (
        <FlatList
        refreshing={false}
        onRefresh={myListings}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ListItemSeparator}
        data={listings}
        key={item => item.by}
            renderItem={({item}) => 
            <ListItem 
            image={item.images[0]} 
            title={item.title}
            subTitle={item.description}
            
            /> 
            } />)
    :
       
    null
        
    }
       
    

      
     
    </>
  ) 
}
