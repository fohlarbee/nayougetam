import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";


import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../Globals/AppContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const {setUser} = useContext(AppContext)
 
    const login = async (email, password) => {
         setIsLoading(true)
         setError(null)

         const response = await fetch('http://192.168.0.194:4000/api/user/login', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})

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
            try {
                await AsyncStorage.setItem('user', JSON.stringify(json))
                
            } catch (error) {
                throw Error('Error while saving user to local storage')  
            } 
            
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
            alert('User LoggedIn')
            setUser(JSON.stringify(json))
         }
         
    }
    return {login, isLoading, error}
}