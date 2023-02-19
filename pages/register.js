import React, {useState} from 'react';
import Head from "next/head";
import axios from "axios";
import {useRouter} from "next/router";
import { RiEyeCloseLine , RiEyeFill } from "react-icons/ri";

function Register(props) {

    const [userData, setUserData] = useState({
        email: "",
        nickname: "",
        password : ""
    });

    const [canSee, setCanSee] = useState(false);
    const [isText, setIsText] = useState(false);

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

    const handleReveal = () => {
        setCanSee(!canSee);
        setIsText(!isText);
    }

    return (
        <div>
            <Head>
                <title>Registration</title>
            </Head>
            <div className="container bg-green-100">
                <form onSubmit={handleSubmit} method="POST" id="register-form" className="form-register">

                    <div className="grp">
                        <label htmlFor="email">E-mail</label>
                        <input onChange={handleChange} className="input" id="e-mail" type="email" name="email" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="nickname">NickName</label>
                        <input onChange={handleChange} className="input" id="nickname" type="text" name="nickname" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <input onChange={handleChange} className="input grp" id="password" type={isText ? "text" : "password"} name="password" required={true}/>
                            <div className="icon" onClick={handleReveal}>
                                {
                                    canSee ?
                                        <RiEyeFill title="Hide"/>
                                        :
                                        <RiEyeCloseLine title="Reveal"/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="h-24">
                        <input type="submit" value="Sign Up" className="btn mt-9 border-b-2 border-bluec hover:bg-bluec hover:text-white"/>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;