import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'

import { CustomButton } from './CustomButton'

export function SubmitButton({actionText,styling, ...otherProps}) {
    const {handleSubmit} = useFormikContext();
  return (
    <>
    <CustomButton styling={styling}  actionText={actionText} {...otherProps} onPress={() => {
      handleSubmit()
    }
      }/> 
    
    </> 

  )
}

const styles = StyleSheet.create({})