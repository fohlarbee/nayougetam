import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert} from 'react-native'
import React, { useContext, useState } from 'react';
import { Text} from '@rneui/themed';
import  Screen from '../components/Screen';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons'
import OTPInputView from '../components/OTPInputView';
import AppContext from '../Globals/AppContext';
import BottomCoponent from './BottomCoponent';
import { Theme } from '../Theme';
import { useVerification } from '../hooks/useVerification';
import { CustomButton } from '../components/CustomButton';


export default function Verification({route}) {
    const { email } = route.params;
    // const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const [otpcode, setOtpCode] = useState([]);
    const[codeError, setCodeError] = useState(false);
    const {verify, error, isLoading, isBottomSheetVisible, setIsBottomSheetVisible} = useVerification()
    const {setUserLoggedIn, user} = useContext(AppContext)




    // const toggleBottomSheet = () => {
    //   setBottomSheetVisible(!isBottomSheetVisible);
    // };
    const onClose = () => {
        setIsBottomSheetVisible(false);
    }

    const handleSubmit = async(email, otp) => {
        await verify(email, otp)
    }
   
    
  return (
    <Screen>
        <KeyboardAvoidingView 
        style={styles.container}
        focusable
        enabled
        
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}

        >
            
            <Text h4 style={{ fontWeight:'600', color:'#404040'}}>VERIFICATION</Text>
            <View style={styles.wrapper}>
                <Icon name='message-text-lock' size={40} color='#fff' style={{fontWeight:'700'}}/>
            </View>
            <View style={{alignSelf:'center'}}>
                    <Text h4 style={{fontWeight:'500',textAlign:'center'}}>Verification Code</Text>
                    <Text small style={{marginTop:5, textAlign:'center',color:'rgba(0,0,0,0.5)'}}>We have sent a 4 digit code verification to</Text>
                    <Text small style={{ textAlign:'center', color:'rgba(0,0,0,0.5)'}}>{email}</Text>

            </View>
            
            <View  style={{width:'80%', height:100, paddingHorizontal:32}}>
                <OTPInputView pinCount={4}
        
                autoFocusOnLoad={true}
                codeInputFieldStyle={{
                     width:50,
                     height:50,
                     color:'green',
                     borderWidth:2
                }}
                codeInputHighlightStyle={{
                    borderColor:'#8062D6',
                }}
                onCodeFilled={(code) =>{
                    setOtpCode(code)
                }}
                   
                />
             {codeError && 
             <Text style={{textAlign:'center', color:'red'}}>
                OTP must be a 4 digit number</Text>}
            {isLoading && <Text style={{fontSize:9, textAlign:'center'}}>validating code</Text>}
            
            </View>
            {error && <Text style={{fontSize:9, textAlign:'center', color:Theme.colors.danger, marginBottom:6 }}>{error}</Text>}
            <CustomButton
             onPress={() => handleSubmit(email, otpcode)}
             actionText='Verify' 
             color='#8062D6' 
             textColor='#fff'
             styling={{marginHorizontal:30, marginTop:20, marginBottom:5}}
             />
                <Text onPress={()=> Alert.alert('Code sent')} small style={{color:Theme.colors.appBlue}}>Resend code</Text>
            
        </KeyboardAvoidingView>
        <BottomCoponent isBottomSheetVisible={isBottomSheetVisible} onClose={onClose}/>
       
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    },
    wrapper :{
        padding:40,
        backgroundColor:'#8062D6',
        borderRadius:100,
        shadowColor:'rgba(0,0,0,0.2)',
        // shadowOpacity:0.5,
        // elevation: Platform.OS == 'android' ? 'rgba(0,0,0,0.2)' : null,
        shadowOffset:{ width:30},
        shadowRadius:1,
        marginVertical:30
        

    },
   
   
})