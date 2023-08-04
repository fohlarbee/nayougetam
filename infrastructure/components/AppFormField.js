import { StyleSheet } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik';

import { ErrorMessage } from './ErrorMessage';
import { AppTextComponents } from './AppTextComponents';
import { Theme } from '../Theme';
export function AppFormField({icon, placeholder, width, name, ...otherProps}) {
    const {setFieldTouched, setFieldValue, errors, touched, values} = useFormikContext();
  return (
<>
    <AppTextComponents
    {...otherProps}
    placeholder={placeholder}
    onBlur={() => setFieldTouched(name)}
    onChangeText={text => setFieldValue(name, text)}
    icon={icon}
    value={values[name]}
    width={width}
    />
    <ErrorMessage style={styles.errorMessageStyle} error={errors[name]} visible={touched[name]}/>
</>
  )
}
const styles = StyleSheet.create({
  errorMessageStyle:{
      color:Theme.colors.danger,
      fontSize:12,
      marginHorizontal:20

  }
})