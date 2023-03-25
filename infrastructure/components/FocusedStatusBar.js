import { useIsFocused } from "@react-navigation/core"
import { StatusBar } from "react-native"

export const FocusedStatusBar = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar animated={true} {...props}/> : null
}

