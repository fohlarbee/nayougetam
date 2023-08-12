import { DefaultTheme } from "@react-navigation/native";
import { Theme } from "../Theme";



export default  {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        primary:Theme.colors.appPurple,
        backgroundColor:Theme.colors.white
    }
}