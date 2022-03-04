import React from "react";
import { useField } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface IOption {
  value: string;
  label: string;
}
interface IProps {
  name: string;
  options: IOption[];
  label: string;
}

const CustomSelect = <T,>({ name, options, label }: IProps) => {
  const [field, meta, helpers] = useField<T>(name); 
  const classes = useStyles();
  // console.log(meta);


  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...field}
          >
          {options.map((item, i) => {
            return (
              <MenuItem key={`select-${name}-${i}`} value={item.value}>
                {item.value}
                {/* {console.log(`select-${name}-${i}`)} */}
                
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{<span className="Error-message">{meta.touched && meta.error}</span>}</FormHelperText>
      </FormControl>
    </>
  );
};

export default CustomSelect;