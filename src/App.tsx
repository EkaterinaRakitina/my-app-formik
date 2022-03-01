import React from "react";
import { Formik, Field, Form } from "formik";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <h1>My Form</h1>
        <Formik
          initialValues={{
            lastName: "",
            firstName: "",
            fullName: "",
            birthDate: "",
            sex: "",
          }}
          // onSubmit={values => console.log(values)}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <Form>
              <label htmlFor="lastName">Last name: </label>
              <Field type="text" name="lastName" id="lastName" />
              <br />
              <label htmlFor="firstName">First name: </label>
              <Field type="text" name="firstName" id="firstName" />
              <br />
              <label htmlFor="fullName">Full name: </label>
              <Field type="text" name="fullName" id="fullName" />
              <br />
              <label htmlFor="birthDate">Birth date: </label>
              <Field type="date" name="birthDate" id="birthDate" />
              <br />
              <label htmlFor="sex">Sex: </label>
              <Field as="select" name="sex" id="sex">
                <option value="mail">Male</option>
                <option value="femail">Female</option>
              </Field>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
