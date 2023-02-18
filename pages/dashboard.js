import React, {useEffect} from 'react';
import Head from "next/head";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

function Dashboard(props) {

    const router = useRouter();

    useEffect(() => {
        if (window.localStorage.getItem('auth-token') === "")
        {
            router.push("/login").then(r => {});
            toast.error("You need to log in...", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon: " ⛔ "
            })
        }
    }, [])

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div>
                This is home
            </div>
        </div>

    );
}

export default Dashboard;