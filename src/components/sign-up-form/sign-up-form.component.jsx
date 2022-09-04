import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const SignUpForm = () => {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formField, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formField;
    // console.log('hit');

    const resetFormField = () => {
        setFormField(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // createAuthUserWithEmailAndPassword();

        if (password !== confirmPassword) {
            alert('Password do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormField();


        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert('Email has already been taken');
            } else {

                console.log(error);
            }
        }
    }

    return (
        <div className="sign-up-container">
        <h2>Don't have an account?</h2>
            <span>SignUp with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='display Name' type={'text'} required onChange={handleChange} name='displayName' value={displayName} />
                
                <FormInput label='Email' type={'email'} required onChange={handleChange} name='email' value={email} />
                
                <FormInput label='Password' type={'password'} required onChange={handleChange} name='password' value={password} />
                
                <FormInput label='Confirm Password' type={'password'} required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    );
}

export default SignUpForm;