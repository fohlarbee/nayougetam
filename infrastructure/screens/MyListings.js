import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Button, Text } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { CardComponent } from "../components/CardComponent"
import { ListItem } from "../components/ListItem"
import { db } from "../firebase/firebaseConfig"
import AuthContext from "../Globals/AppContext"
export function MyListings() {
    const {user} = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    

    const myListings = async() => {
        let lists = [];
        const q = collection(db,'listings');
        const filter = query(q, where('by', '==', user));
        onSnapshot(filter, (onSnap) => {
            onSnap.forEach(item => {
                console.log(item.data());
                lists.push(item.data());
                setListings(lists);

            })
        })
        
    }
   useEffect(() => {
    myListings();
   },[])
  return (
    <>
     <FlatList
     refreshing={false}
     onRefresh={myListings}
     showsVerticalScrollIndicator={false}
     data={listings}
     key={item => item.by}
      renderItem={({item}) => 
      <ListItem 
      image={item.images[0]} 
      title={item.title}
      subTitle={item.description}
      
      />
      }/>
     
    
    </>
  ) 
}
