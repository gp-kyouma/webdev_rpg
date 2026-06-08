function LoginForm({setData, confirm}) {

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const formData = new FormData(e.target);

        // work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        if (await setData(formJson))
            confirm()
    }

    return (
        <>

        <hr/>
        <form method="post" onSubmit={handleSubmit}>

        <input name="username" type="text" placeholder="Username"/>
        <br/>
        <input name="user_password" type="password" placeholder="Password"/>
        <hr></hr>

        <button type="submit">Login / Register</button>

        </form>

        </>
    );
}

export default function LoginScreen({ confirm, setData }) {

    return (
        <LoginForm setData={setData} confirm={() => confirm(true)}/>
    );
}