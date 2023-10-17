import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


import AppContext from "../Globals/AppContext";
import { useAuthContext } from "./useAuthContext";



export const useResetPassword = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {setUser} = useContext(AppContext)
    const {dispatch} = useAuthContext();

 
    const resetPassword = async (email, otp, newPassword) => {
         setIsLoading(true)
         setError(null)

         const response = await fetch('http://192.168.0.194:4000/api/user/reset_password', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email, otp, newPassword})

         })

         const json = await response.json();

         if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            return

         }

         if(response.ok){
            setError(null)

            try {
               await AsyncStorage.removeItem('user')
               
           } catch (error) {
               throw Error('Error while remove user from local storage')  
           } 
           
           dispatch({type: 'LOGOUT'})


            alert('Password succesfully changed')
            setIsLoading(false);
            setUser(null)

         }
         
    }
    return {resetPassword, isLoading, error}
}