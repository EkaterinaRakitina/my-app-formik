import React from "react";
import { ErrorMessage, useField } from "formik";
import TextField from "@material-ui/core/TextField";

interface Props {
  name: string;
}

const CustomInput = <T, >({ name }: Props) => {
  const [field, meta, helpers] = useField<T>(name);

  return (
    <>
      <TextField 
        {...field}
        helperText={meta.touched && meta.error}
        error={meta.touched && !!meta.error}
      />
      {/* <ErrorMessage name={name}>
        {(msg) => <div className="Error-message">{msg}</div>}
      </ErrorMessage> */}
    </>
  );
};

export default CustomInput;
