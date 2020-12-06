import * as React from "react";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import {
  ContactWrapper,
  ContactPageTitle,
  ContactFromWrapper,
  InputGroup,
} from "./style";

interface MyFormValues {
  firstName: string;
  email: string;
  message: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const Contact: React.SFC<{}> = () => {
  return (
    <Formik
      initialValues={{ firstName: "", email: "", message: "" }}
      onSubmit={(values: MyFormValues, actions: any) => {
        setTimeout(() => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 700);
      }}
      validationSchema={SignupSchema}
      render={({
        handleChange,
        values,
        errors,
        handleBlur,
        touched,
        isSubmitting,
      }: FormikProps<MyFormValues>) => (
        <>
          <Form>
            <ContactWrapper>
              <ContactPageTitle>
                <h2>Contact</h2>
                <p>
                  If you have any problem or would like to contact me please
                  fill out the form below. 
                <br/>Every opinion worth million!</p>
              </ContactPageTitle>
              <ContactFromWrapper>
                <InputGroup>
                  <Input
                    type="text"
                    name="firstName"
                    value={`${values.firstName}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Name"
                    notification={`${
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }`}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={`${values.email}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Email"
                    notification={`${
                      errors.email && touched.email ? errors.email : ""
                    }`}
                  />
                </InputGroup>
                <Input
                  type="textarea"
                  name="message"
                  value={`${values.message}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Message"
                  notification={
                    errors.message && touched.message ? errors.message : ""
                  }
                />
                <Button
                  title="Submit"
                  type="submit"
                  isLoading={isSubmitting ? true : false}
                  loader="Submitting.."
                />
              </ContactFromWrapper>
            </ContactWrapper>
          </Form>
        </>
      )}
    />
  );
};

export default Contact;
