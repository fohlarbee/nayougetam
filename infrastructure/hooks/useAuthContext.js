import { AuthContext } from "../Globals/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext must be used inside of a AuthContextProvider')
    }

    return context;  
}