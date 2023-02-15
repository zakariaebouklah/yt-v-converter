import React from 'react';
import Head from "next/head";

function Login(props) {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container">
                <form method="POST" id="login-form" className="form-login">

                    <div className="grp">
                        <label htmlFor="e-mail">E-mail</label>
                        <input className="input" type="text" name="e-mail" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="password">Password</label>
                        <input className="input" type="text" name="password" required={true}/>
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