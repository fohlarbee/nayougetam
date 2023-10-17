import { useState } from "react";



export const useSendResetPasswordEmail = () => {
    const [isError, setIsError] = useState(null);
    const [isLoadingg, setIsLoadingg] = useState(null);
 
    const sendResetPasswordEmail = async (email) => {
         setIsLoadingg(true)
         setIsError(null)

         const response = await fetch('http://192.168.0.194:4000/api/user/forgot_password', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email})

         })

         const json = await response.json();

         if(!response.ok){
            setIsLoadingg(false)
            setIsError(json.error)
            return

         }

         if(response.ok){
            setIsError(null)


            setIsLoadingg(false);
            alert('Password reset email sent')
            // navigation.navigate('Verification', {email:email})

         }
         
    }
    return {sendResetPasswordEmail, isLoadingg, isError}
}