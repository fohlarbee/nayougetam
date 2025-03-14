import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'

import { CustomButton } from './CustomButton';

export function SubmitButton({actionText,styling, color, size, iconColor, name, onPress, textColor, disabled, ...otherProps}) {

    // const {handleSubmit} = useFormikContext();


  return (
    <>
    <CustomButton 
    styling={styling} color={color}  
    actionText={actionText} 
    size={size}
    name={name}
    iconColor={iconColor} 
    textColor={textColor}
    {...otherProps}
    // onPress={handleSubmit}
    // onPress={onPress}
    disabled={disabled}
      /> 
    
    </> 

  )
}

const styles = StyleSheet.create({})