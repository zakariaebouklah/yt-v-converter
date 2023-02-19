import React, {useState} from 'react';
import Head from "next/head";
import {useRouter} from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { RiEyeCloseLine , RiEyeFill } from "react-icons/ri";

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [canSee, setCanSee] = useState(false);
    const [isText, setIsText] = useState(false);

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
            console.log(response.data);
            /**
             * TODO: Choose wisely between using localstorage or using cookies to store JWT token
             * currently we're using localStorage...
             */
            window.localStorage.setItem("auth-token", response.data.token);

            router.push('/dashboard').then(() => {
                router.reload();
            });
        }
        catch (err) {
            toast.error(err.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon: " 😵 "
            })
        }
    }

    const handleReveal = () => {
        setCanSee(!canSee);
        setIsText(!isText);
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container bg-[#e1ebff]">
                <form method="POST" id="login-form" className="form-login" onSubmit={handleSubmit}>

                    <div className="grp">
                        <label htmlFor="e-mail">E-mail</label>
                        <input onChange={e => setUsername(e.target.value)} className="input" type="email" name="e-mail" required={true}/>
                    </div>

                    <div className="grp">
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <input onChange={e => setPassword(e.target.value)} className="input grp" type={isText ? "text" : "password"} name="password" required={true}/>
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
                        <input type="submit" value="Sign In" className="btn mt-7 border-b-2 border-greenc hover:bg-greenc hover:text-white"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;