import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';


const useLocation = () => {
    const [location, setLocation] = useState({});

    const getLocation = async() => {
        try {
            const {granted} = await Location.requestForegroundPermissionsAsync();
            if(!granted) return Alert.alert('App Notice', 'Please allow permission for location',[
                {text:'OK'}
            ])
            const result = await Location.getCurrentPositionAsync();
            let latitude = result.coords.latitude;
            let longitude = result.coords.longitude;
            
            setLocation({latitude,longitude})
       
        } catch (error) {
            console.log(error);
        }
        
            
            
    }
    useEffect(() => {
        getLocation();
    },[location])

   return location;
};

export default useLocation;