import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik';

import { CustomTextInput } from './CustomTextInput';
import { ErrorMessage } from './ErrorMessage';
import { AppTextComponents } from './AppTextComponents';
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
    <ErrorMessage style={styles.erroMessageStyle} error={errors[name]} visible={touched[name]}/>
</>
  )
}

const styles = StyleSheet.create({})