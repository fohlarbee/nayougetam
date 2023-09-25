import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigation } from "@react-navigation/native";


import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const navigation = useNavigation()
 
    const signup = async ( username,email, password) => {
         setIsLoading(true)
         setError(null)

         const response = await fetch('http://192.168.0.194:4000/api/user/signup', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({username,email, password})

         })

         const json = await response.json();

         if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            return

         }

         if(response.ok){
            setError(null)

            // save user to local storage
            // try {
            //     await AsyncStorage.setItem('user', JSON.stringify(json))
                
            // } catch (error) {
            //     throw Error('Error while saving user to local storage')  
            // } 
            
            // dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
            alert('Account creation succesfful')
            navigation.navigate('Verification', {email:email})

         }
         
    }
    return {signup, isLoading, error}
}