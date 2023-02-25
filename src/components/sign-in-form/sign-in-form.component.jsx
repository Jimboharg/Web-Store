import { useState } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  // displayName: "",
  email: "",
  password: "",
  // confirmPassword: "",
};

const SignInForm = () => {
  // calls useState which returns an array with two values - 1. the state 2. a function callback which changes the state in 1 when called.
  const [formFields, setFormFields] = useState(defaultFormFields);
  // destructure the object now stored in the above state to create the variables displayName, email etc.
  const { email, password } = formFields;

  //const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code){
      case 'auth/wrong-password':
        alert('incorrect password / email')
        break;
      case 'auth/user-not-found':
        alert('no account associated with this email')
        break;
      default:
        console.log()
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
    <div className="sign-in-container">
      <h2>Please sign in</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;