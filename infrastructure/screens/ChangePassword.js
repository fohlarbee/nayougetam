import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AppForm from '../components/AppForm'
import { AppFormField } from '../components/AppFormField'
import { Theme } from '../Theme'
import { CustomButton } from '../components/CustomButton'

const validationSchema = () => Yup.object().shape({
    newPassword: Yup.string().required().min(6).label("newPassword"),
    confirmNewPassword: Yup.string().required().min(6).label("newPassword")
  })

export default function ChangePassword() {
  return (
    <View style={styles.areaView}>
      <Text style={{fontSize:26, fontWeight:'700', color:Theme.colors.appPurple, textAlign:'center', marginVertical:40}}>Change Password</Text>

      <CustomButton actionText='Proceed' color={Theme.colors.appPurple} textColor='#fff' styling={{marginVertical:20}}/>

      {/* <AppForm
         initialValues={{newpassword:'', confirmNewPassword:'', code:''}}
         validationSchema={validationSchema}
      >
       <AppFormField
              name='newPassword'
              maxLength={20}
              placeholder='new password'
              icon='lock-outline'
              secureTextEntry
              
            />
       <AppFormField
              name='confirmNewPassword'
              maxLength={20}
              placeholder='Confirm password'
              icon='lock-outline'
              secureTextEntry
              
            />
            <CustomButton actionText='Proceed' color={Theme.colors.appPurple} textColor='#fff' styling={{marginVertical:20}}/>
      </AppForm> */}
    </View>
  )
}

const styles = StyleSheet.create({
  areaView:{
    marginTop:40
  }
})