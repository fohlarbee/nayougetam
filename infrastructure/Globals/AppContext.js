import React from "react";
// const AppContext = React.createContext();

// function AppProvider ({children}) {
//     // const [userBioData,setUserBioData] = useState({email:'',firstName:'',lastName:''});
//     const [ successfulSwitch, setSuccessfulSwitch ] = useState(false);
//     const [userLoggedIn, setUserLoggedIn] = useState(false);

//     return (
//         <AppContext.Provider value={{
//             successfulSwitch,
//             setSuccessfulSwitch,
//             userLoggedIn,
//             setUserLoggedIn
//         }}
//         >
//             {children}
//         </AppContext.Provider>
//     )
// }

// export {AppContext,AppProvider}

const AuthContext = React.createContext();
export default AuthContext