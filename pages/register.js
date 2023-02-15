import React from 'react';
import Head from "next/head";

function Register(props) {
    return (
        <div>
            <Head>
                <title>Registration</title>
            </Head>
            <div className="container">
                <form method="POST" id="login-form" className="form-register">

                    <div className="grp">
                        <label htmlFor="e-mail">E-mail</label>
                        <input className="input" type="text" name="e-mail" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="e-mail">NickName</label>
                        <input className="input" type="text" name="e-mail" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="password">Password</label>
                        <input className="input" type="text" name="password" required={true}/>
                    </div>

                    <div className="h-24">
                        <input type="submit" value="Sign Up" className="btn mt-9"/>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;