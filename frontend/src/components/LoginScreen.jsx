import { useState } from "react";
import { VerifyUser, RegisterUser } from "./js/verify";

function LoginForm({setData, confirm}) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const formData = new FormData(e.target);

        // work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        const buttonName = e.nativeEvent.submitter.name

        setIsSubmitting(true)

        if (buttonName == "register")
            await RegisterUser(formJson)
        else if (buttonName == "login")
            if (await VerifyUser(formJson, setData))
                confirm()

        setIsSubmitting(false)
    }

    return (
        <>

        <hr/>
        <form method="post" onSubmit={handleSubmit}>

        <input name="username" type="text" placeholder="Username"/>
        <br/>
        <input name="user_password" type="password" placeholder="Password"/>
        <hr></hr>

        <div style={{display: 'flex', gap: '60px'}}>
            <button type="submit" name="login" disabled={isSubmitting}>Login</button>
            <button type="submit" name="register" disabled={isSubmitting}>Register</button>
        </div>

        </form>

        </>
    );
}

export default function LoginScreen({ confirm, setData }) {

    return (
        <LoginForm setData={setData} confirm={() => confirm(true)}/>
    );
}