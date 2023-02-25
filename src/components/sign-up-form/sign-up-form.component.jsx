import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
//import { UserContext } from "../../contexts/user.context";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // calls useState which returns an array with two values - 1. the state 2. a function callback which changes the state in 1 when called.
  const [formFields, setFormFields] = useState(defaultFormFields);
  // destructure the object now stored in the above state to create the variables displayName, email etc.
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password and confirmed password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName }); // does displayname need to be in {}?? It should already be an object
      alert("account created succesfully");
      setFormFields(defaultFormFields); // reset form fields to default ie empty strings
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email is already in use");
        return;
      } else {
        alert(`user creation encountered an error ${error.message}`);
        console.log(error);
        return;
      }
    }
   };

  // when anything changes in the inout box an event object is passed to this function
  const onInputBoxTyping = (event) => {
    // the event has a target property which contains a reference to the object which despatched the event,
    // in this case the HTMLinputElement (the input elements below).
    // event.target is destructured to give event.target.name and event.target.value stored in the variables name, value.
    const { name, value } = event.target;
    // change the formFields state to be the full formFields object - then overwrite the values in the object that match the "name"
    // passed by the input field's name property with the matching "value" property.
    // [name] syntax is to assign a variable to a key.
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={onInputBoxTyping}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={onInputBoxTyping}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={onInputBoxTyping}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={onInputBoxTyping}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
