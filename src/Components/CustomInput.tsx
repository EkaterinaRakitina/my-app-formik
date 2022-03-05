import React from "react";
import { useField } from "formik";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

interface IProps {
  name: string;
  type: string;
}

type CustomInputProps = IProps & TextFieldProps;

const CustomInput = <T, >({ name, type, ...props }: CustomInputProps) => {
  const [field, meta, helpers] = useField<T>(name);
  console.log(meta);

  return (
    <>
      <TextField 
        {...field} 
        label={name} 
        type={type}
        margin='normal'
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        helperText={meta.touched && meta.error}
        error={meta.touched && !!meta.error}
        {...props}
      />
    </>
  );
};

export default CustomInput;
