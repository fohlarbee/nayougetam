import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuthContext } from "./useAuthContext"
import { useContext } from "react"
import AppContext from "../Globals/AppContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const { setUser} = useContext(AppContext)
    const logout = async() => {
        // remove user from local storage
        await AsyncStorage.removeItem('user')

        //dispatch  logout action
        dispatch({type:'LOGOUT'})

        setUser(null)
        

    } 

    return {logout }
}