import React, {useState} from 'react';
import Head from "next/head";
import axios from "axios";
import {useRouter} from "next/router";

function Register(props) {

    const [userData, setUserData] = useState({
        email: "",
        nickname: "",
        password : ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }))
        // console.log(userData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify(userData))

        axios.post("http://localhost:8000/register", JSON.stringify(userData))
            .then(res => {
                alert("user created successfully");
                router.push("/login").then(r => {});
            })
            .catch(err => {
                alert(err);
            })

        // console.log(userData);
    }

    return (
        <div>
            <Head>
                <title>Registration</title>
            </Head>
            <div className="container">
                <form onSubmit={handleSubmit} method="POST" id="register-form" className="form-register">

                    <div className="grp">
                        <label htmlFor="email">E-mail</label>
                        <input onChange={handleChange} className="input" id="e-mail" type="text" name="email" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="nickname">NickName</label>
                        <input onChange={handleChange} className="input" id="nickname" type="text" name="nickname" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} className="input" id="password" type="password" name="password" required={true}/>
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