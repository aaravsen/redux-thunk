import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"

const SignInForm = () => {
    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formField, setFormField] = useState(defaultFormFields);
    const { email, password } = formField;

    const resetFormField = () => {
        setFormField(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormField();


        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password for email');
                    break;

                case 'auth/user-not-found':
                    alert('User not found');
                    break;

                default:
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();



    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Email' type={'email'} required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type={'password'} required onChange={handleChange} name='password' value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;