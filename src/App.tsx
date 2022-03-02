import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

function App() {
  const genders = ["Male", "Female", "Other"];

  const chooseOption = genders.map((gender, key) => (
    <option value={gender} key={key}>
      {gender}
    </option>
  ));

  const validationSchema = Yup.object({
    lastName: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    fullName: Yup.string(),
    birthDate: Yup.date()
      .required("Required")
      .default(() => new Date()),
    sex: Yup.string().required("Please select a gender").oneOf(genders),
    guests: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Required"),
          age: Yup.number().required("Required").min(18),
        })
      )
      .min(1),
  });

  const initialValues = {
    lastName: "",
    firstName: "",
    fullName: "",
    birthDate: "",
    sex: "",
    guests: [{ name: "Ivan", age: 18 }],
  };

  return (
    <div className="App">
      <div>
        <h1>My Form</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={values => console.log(values)}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 500);
            {console.log(values)}
          }}
        >
          {(props) => (
            <Form>
              <div className="Form-control">
                <label htmlFor="lastName">Last name: </label>
                <Field type="text" name="lastName" id="lastName" />
                <ErrorMessage
                  className="Error-message"
                  name="lastName"
                ></ErrorMessage>
              </div>
              <div className="Form-control">
                <label htmlFor="firstName">First name: </label>
                <Field type="text" name="firstName" id="firstName" />
              </div>
              <div className="Form-control">
                <label htmlFor="fullName">Full name: </label>
                <Field type="text" name="fullName" id="fullName" />
              </div>
              <div className="Form-control">
                <label htmlFor="birthDate">Birth date: </label>
                <Field type="date" name="birthDate" id="birthDate" />
              </div>
              <div className="Form-control">
                <label htmlFor="sex">Sex: </label>
                <Field as="select" name="sex" id="sex">
                  <option value={""}>Select</option>
                  {chooseOption}
                </Field>
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
                            <Field name={`guests.${index}.age`} />
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
