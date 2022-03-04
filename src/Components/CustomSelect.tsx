import React from "react";
import { useField } from "formik";
import { FormControl, InputLabel, Select, MenuItem, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface IProps {
  name: string;
}

const CustomSelect = <T, >({ name }: IProps) => {
  const [field, meta, helpers] = useField<T>(name);
  console.log(field);
  // const genders = ["Male", "Female", "Other"];
  const classes = useStyles();
  const [gender, setGender] = React.useState('');
  const handleChange = <T, >(e): any => {
    setGender<T>(e.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Sex</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={handleChange}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default CustomSelect;
