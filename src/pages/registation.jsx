import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const Values = {
  fullName: '',
  email: '',
  dateOfBirth: new Date(),
  address: '',
  city: '',
  state: '',
  zipCode: '',
  userName: '',
  password: '',
};

const Registration = () => {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(Values);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('full name is required'),
    email: Yup.string().email('Invalid email').required(),
    dateOfBirth: Yup.date().required('date is required'),
    address: Yup.string().required('addres is required'),
    city: Yup.string().required('city is required'),
    state: Yup.string().required('state is required'),
    zipCode: Yup.number().required('zip code is required'),
    userName: Yup.string().required('username is required'),
    password: Yup.string()
      .required('password is required')
      .min(8, 'password must be at least 8 characters')
      .max(32, 'password must be no more than 32 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:8080/register', values)
      .then((response) => {
        console.log(response.data);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setSubmitting(false);
      });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const isFormValid = () => {
    switch (step) {
      case 1:
        return !!values.fullName && !!values.email && !!values.dateOfBirth;
      case 2:
        return !!values.address && !!values.city && !!values.state && !!values.zipCode;
      case 3:
        return !!values.userName && !!values.password;
      default:
        return false;
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 1 && (
              <div>
                <h3>Personal Information</h3>
                <label>Full Name: </label>
                <Field type="text" name="fullName" />
                <div>
                  <ErrorMessage name="fullName" />
                </div>
                <div>
                  <label>Email: </label>
                  <Field type="email" name="email" />
                  <div>
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div>
                  <label>Date of Birth: </label>
                  <Field type="date" name="dateOfBirth" />
                  <div>
                    <ErrorMessage name="dateOfBirth" />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3>Address Information</h3>
                <label>Address: </label>
                <Field type="text" name="address" />
                <div>
                  <ErrorMessage name="address" />
                </div>
                <div>
                  <label>City: </label>
                  <Field type="text" name="city" />
                  <div>
                    <ErrorMessage name="city" />
                  </div>
                </div>
                <div>
                  <label>State: </label>
                  <Field type="text" name="state" />
                <div>
                  <ErrorMessage name="state" />
                </div>
              </div>
              <div>
                <label>Zip Code: </label>
                <label>Zip Code: </label>
                <Field type="text" name="zipCode" />
                <div>
                  <ErrorMessage name="zipCode" />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3>Account Information</h3>
              <label>Username: </label>
              <Field type="text" name="userName" />
              <div>
                <ErrorMessage name="userName" />
              </div>
              <div>
                <label>Password: </label>
                <Field type="password" name="password" />
                <div>
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
          )}
          <div>
            <br />
            {step > 1 && (
              <button type="button" onClick={handlePrev}>
                Previous
              </button>
            )}
            {step < 3 && (
              <button type="button" onClick={handleNext} disabled={!isFormValid()}>
                Next
              </button>
            )}
            {step === 3 && (
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  </div>
)};

export default Registration;