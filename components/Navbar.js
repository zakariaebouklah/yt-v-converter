import React from 'react';
import {useRouter} from "next/router";

function Navbar({children}) {

    const router = useRouter();

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    {/*    logo part*/}
                    Logo
                </div>
                {
                    router.pathname === "/" ?
                        <div className="connection">
                            <button className="btn" onClick={() => router.push("/login")}>Login</button>
                            <button className="btn" onClick={() => router.push("/register")}>Register</button>
                        </div>
                        :
                        <div className="animation">
                            <div className="logo">Animation</div>
                        </div>
                }
            </nav>
            <main>
                {children}
            </main>
        </>
    );
}

export default Navbar;