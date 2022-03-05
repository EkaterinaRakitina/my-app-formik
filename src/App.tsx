import React from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { Grid, Button } from "@material-ui/core";
import * as Yup from "yup";
import moment from "moment";
import CustomInput from "./Components/CustomInput";
import CustomSelect from "./Components/CustomSelect";
import "./App.css";

const App = () => {
  
  const validationSchema = Yup.object({
    lastName: Yup.string().required("Required").trim(),
    firstName: Yup.string().required("Required"),
    fullName: Yup.string(),
    birthDay: Yup.string()
    .test("DOB", "You must be at least 18 years", (value) => {
      return moment().diff(moment(value), "years") >= 18;
    })
    .required("Required"),
    sex: Yup.string().required("Please select a gender"),
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
  });

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

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
            <Form>
              <Grid container spacing={2} className="Container">
                <Grid item xs={12}>
                  <CustomInput<FormFields> name="lastName" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput<FormFields> name="firstName" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput<FormFields> name="fullName" type="text" />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput<FormFields> name="birthDay" type="date" />
                </Grid>
                <Grid item xs={12}>
                  <CustomSelect<FormFields>
                    name="sex"
                    options={options}
                    label="Sex"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="guests"
                    render={(arrayHelpers) => (
                      <div >
                        <h3>Add guests</h3>
                        {props.values.guests.length > 0
                          ? props.values.guests.map((guest, index) => (
                              <div key={index} className="Guests-block">
                                <CustomInput<FormFields> name={`guests.${index}.name`} label="Name" type="text"/>
                                <CustomInput<FormFields> name={`guests.${index}.age`} label="Age" type="number" />
                                <Button
                                  variant="contained"
                                  type="button"
                                  size='small'
                                  fullWidth={false}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </Button>
                              </div>
                            ))
                          : null}
                        <Button
                          variant="contained"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ name: "", age: "" })
                          }
                        >
                          Add guest
                        </Button>
                      </div>
                    )}
                  />
                  <ErrorMessage name="guests">{msg => typeof msg === "string" ? <span className="Error-message">{msg}</span> : null}</ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default App;