import { useState, useContext } from "react";
import AppContext from "../Globals/AppContext";


export const useVerification =  () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isBottomSheetVisible,  setIsBottomSheetVisible] = useState(false);

    const {setUserLoggedIn, user} = useContext(AppContext)



    const verify = async (email, otp) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('http://192.168.0.194:4000/api/user/verify', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email, otp})
        })
        const json = await response.json();

        if(!response.ok){
           setIsLoading(false)
           setError(json.error)
           return
        }

        if(response.ok){
           //save user to local storage
        //    try {
        //        await AsyncStorage.setItem('user', JSON.stringify(json))
               
        //    } catch (error) {
        //        throw Error('Error while saving user to local storage')  
        //    } 
           
        //    dispatch({type: 'LOGIN', payload: json})

           setIsLoading(false);
           alert('Account verified')
           setIsBottomSheetVisible(true);

        }
    }

    return {verify, isLoading, error, isBottomSheetVisible, setIsBottomSheetVisible}

}
