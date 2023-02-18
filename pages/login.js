import React, {useState} from 'react';
import Head from "next/head";
import {useRouter} from "next/router";
import axios from "axios";

function Login(props) {

    // const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const postedData = {username, password};
    const configData = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/login_check", postedData, configData
                )
            console.log(response.data.token);
            /**
             * TODO: Choose wisely between using localstorage or using cookies to store JWT token
             * currently we're using localStorage...
             */
            window.localStorage.setItem("auth-token", response.data.token);

            router.push('/dashboard').then(() => router.reload());
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container">
                <form method="POST" id="login-form" className="form-login" onSubmit={handleSubmit}>

                    <div className="grp">
                        <label htmlFor="e-mail">E-mail</label>
                        <input onChange={e => setUsername(e.target.value)} className="input" type="text" name="e-mail" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} className="input" type="password" name="password" required={true}/>
                    </div>

                    <div className="h-24">
                        <input type="submit" value="Sign In" className="btn mt-7"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;