import { DefaultTheme } from "@react-navigation/native";
import { Theme } from "../Theme";



export default  {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        primary:Theme.colors.appPurple,
        background:'#fff'
    }
}