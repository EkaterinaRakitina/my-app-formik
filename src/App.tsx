import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { Grid, Button } from "@material-ui/core";
import * as Yup from "yup";
import moment from "moment";
import CustomInput from "./Components/CustomInput";
import CustomSelect from "./Components/CustomSelect";
import "./App.css";

function App() {
  const genders = ["Male", "Female", "Other"];

  const chooseOption = genders.map((gender, key) => (
    <option value={gender} key={key}>
      {gender}
    </option>
  ));

  const validationSchema = Yup.object({
    lastName: Yup.string().required("Required").trim(),
    firstName: Yup.string().required("Required"),
    fullName: Yup.string(),
    birthDay: Yup.string()
      .test("DOB", "You must be at least 18 years", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      })
      .required("Required"),
    sex: Yup.string().required("Please select a gender").oneOf(genders),
    guests: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          age: Yup.number()
            .required("Required")
            .min(18, "You must be at least 18 years"),
        })
      )
      .min(1, "Should be minimum 1 guest"),
    // guests: Yup.array()
    //   .of(
    //     Yup.object({
    //       name: Yup.string().required("Required"),
    //       age: Yup.number().required("Required").min(18, 'Should be min 18 years old'),
    //     })
    //   )
    //   .min(1, 'Should be minimum 1 guest'),
  });

  interface Guest {
    name: string;
    age: number;
  }

  interface FormFields {
    lastName: string;
    firstName: string;
    fullName: string;
    birthDay: string;
    sex: string;
    guests: Guest[];
  }

  const initialValues = {
    lastName: "",
    firstName: "",
    fullName: "",
    birthDay: "",
    sex: "",
    guests: [{ name: "Ivan", age: 18 }],
  };

  {
    console.log(initialValues);
  }

  return (
    <div className="App">
      <div>
        <h1>My Form</h1>
        <Formik<FormFields>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {(props) => (
            <Grid container spacing={3}>
                <Form>
                  <CustomInput<FormFields> name="lastName" type="text" />
                  <CustomInput<FormFields> name="firstName" type="text" />
                  <CustomInput<FormFields> name="fullName" type="text" />
                  <CustomInput<FormFields> name="birthDay" type="date" />
                  <CustomSelect<FormFields> name="sex" />

                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </Grid>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;

{
  /* 
<div className="Form-control">
  <label htmlFor="sex">Sex: </label>
  <Field as="select" name="sex" id="sex">
    <option value={""}>Select</option>
    {chooseOption}
  </Field>
  <ErrorMessage name="sex">{msg => <div className="Error-message">{msg}</div>}</ErrorMessage>
</div>
<FieldArray
  name="guests"
  render={(arrayHelpers) => (
    <div className="Guests-block">
      <h3>Add guests</h3>
      {props.values.guests.length > 0
        ? props.values.guests.map((guest, index) => (
            <div key={index}>
              <Field name={`guests.${index}.name`} />
              <ErrorMessage name={`guests.${index}.name`}>{msg => <div className="Error-message">{msg}</div>}</ErrorMessage>
              <Field name={`guests.${index}.age`} />
              <ErrorMessage name={`guests.${index}.age`}>{msg => <div className="Error-message">{msg}</div>}</ErrorMessage>
              <button
                type="button"
                onClick={() => arrayHelpers.remove(index)}
              >
                -
              </button>
            </div>
          ))
          : null}
      <button
        type="button"
        onClick={() => arrayHelpers.push({ name: "", age: "" })}
      >
        Add guest
      </button>
    </div>
  )}
/>
<button type="submit">Submit</button>
<ErrorMessage name="guests">{msg => typeof msg === "string" ? <div className="Error-message">{msg}</div> : null}</ErrorMessage> */
}
