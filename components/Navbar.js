import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

function Navbar(props) {

    const router = useRouter();

    let token;
    useEffect(() => {
        token = window.localStorage.getItem('auth-token')
    }, [])

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    {/*    logo part*/}
                    <a href={ token === "" ? "/" : "/dashboard"} className="font-script text-5xl">
                        yt-v-converter
                    </a>
                </div>
                {
                    props.isAuthed ?
                        <div className="animation">
                            <button className="btn border-b-2 border-white hover:text-white hover:border-none hover:bg-gradient-to-b from-bluec to-greenc" onClick={props.logoutEvent}>Logout</button>
                        </div>
                        :
                        <div className="connection">
                            <button className="btn border-b-2 border-orangec hover:bg-orangec hover:border-none" onClick={() => router.push("/login")}>Login</button>
                            <button className="btn border-b-2 border-bluec hover:bg-bluec hover:border-none hover:text-white" onClick={() => router.push("/register")}>Register</button>
                        </div>
                }
            </nav>
        </>
    );
}

export default Navbar;