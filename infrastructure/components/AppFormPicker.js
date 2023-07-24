import React from 'react'

import { useFormikContext } from 'formik'

import { AppPicker } from './AppPicker';
import { ErrorMessage } from './ErrorMessage';
export function AppFormPicker({items, icon, name, width, PickerItemComponent, numberOfColumns, placeholder}) {
    const {errors, setFieldValue, touched, values} = useFormikContext();
  return (
    <>
        <AppPicker
            icon={icon}
            items={items}
            onSelectItem={(item) => setFieldValue(name, item)}
            placeholder={placeholder}
            numberOfColumns={numberOfColumns}
            selectedItem={values[name]}
            width={width}
            PickerItemComponent={PickerItemComponent} 
        />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
    </>
  )
}
