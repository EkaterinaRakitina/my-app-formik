import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

interface IProps {
  name: string;
  type: string;
}

const CustomInput = <T, >({ name, type }: IProps) => {
  const [field, meta, helpers] = useField<T>(name);
  // console.log(meta);

  return (
    <>
      <TextField 
        {...field} 
        label={name} 
        type={type}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        helperText={meta.touched && meta.error}
        error={meta.touched && !!meta.error}
      />
    </>
  );
};

export default CustomInput;
