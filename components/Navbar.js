import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

function Navbar(props) {

    const router = useRouter();

    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     if(window.localStorage.getItem('auth-token') !== "")
    //     {
    //         setIsAuthenticated(true);
    //     }
    //     console.log(window.localStorage.getItem('auth-token'));
    // }, [isAuthenticated])
    //
    // const handleLogout = () => {
    //     window.localStorage.setItem('auth-token', "");
    //     setIsAuthenticated(false)
    //     router.push("/login").then(r => {});
    // }

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    {/*    logo part*/}
                    Logo
                </div>
                {
                    props.isAuthed ?
                        <div className="animation">
                            <button className="btn" onClick={props.logoutEvent}>Logout</button>
                        </div>
                        :
                        <div className="connection">
                            <button className="btn" onClick={() => router.push("/login")}>Login</button>
                            <button className="btn" onClick={() => router.push("/register")}>Register</button>
                        </div>
                }
            </nav>
        </>
    );
}

export default Navbar;