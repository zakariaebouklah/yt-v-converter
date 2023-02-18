import React, {useEffect, useState} from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useRouter} from "next/router";

function Layout({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if(window.localStorage.getItem('auth-token') !== '')
        {
            setIsAuthenticated(true);
        }
        else
        {
            setIsAuthenticated(false);
        }

    }, [])

    const handleLogout = () => {
        window.localStorage.setItem('auth-token', "");
        setIsAuthenticated(false);
        router.push("/login").then(r => {});
    }

    return (
        <div>
            <Navbar isAuthed={isAuthenticated} logoutEvent={handleLogout}/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;