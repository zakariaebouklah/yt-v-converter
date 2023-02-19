import React, {useEffect, useState} from 'react';
import Head from "next/head";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

function New(props) {

    const router = useRouter();

    const [url, setUrl] = useState('');
    const [format, setFormat] = useState("mp3");
    const [jwt, setJWT] = useState('');
    const [loader, setLoader] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [downloadLink, setDownloadLink] = useState("");

    useEffect(() => {
         setJWT(window.localStorage.getItem('auth-token'));
    }, [])

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

    const handleDownloadClick = () => {
        setIsClicked(true);
        setDisabled(false);
    }

    const configData = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }

    const handleChange = (e) => {
        setFormat(e.target.value)
        // console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabled(true);
        setLoader(true);

        e.target.reset();

        const postToApiEndPoint = async (endpoint) => {
            try {

                const response = await axios.post(endpoint, {url, jwt}, configData);

                console.log(response.data);

                if(response.data.success)
                {
                    setDownloadLink(response.data.link);
                    setLoader(false);
                    setIsClicked(false);
                }
                //if jwt is expired or "yt-url" is invalid ; then the "data" we got in the front-end is an empty string.
                else if (typeof response.data === "string")
                {
                    toast.error("Session timeout... You need to login.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        icon: " 🤔 "
                    })
                    setTimeout(() => {
                        router.push("/login").then(() => router.reload());
                    }, 7000)
                    window.localStorage.setItem("auth-token", "");
                }
                else
                {
                    toast.error("something went wrong...", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        icon: " 🤔 "
                    })
                }
            }
            catch (err) {
                // console.log(err)
                toast.error("Something went wrong...", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    icon: " 🤔 "
                })
            }
        };

        switch (format) {
            case "mp3":

                postToApiEndPoint("../api/mp3")
                    .then(r => {});
                break;

            case "mp4":

                postToApiEndPoint("../api/mp4")
                    .then(r => {})
                break;
        }
    }

    return (
        <div>
            <Head>
                <title>New Conversion</title>
            </Head>
            <div>
                <form method="POST" className="form-conversion" id="conversion-form" onSubmit={handleSubmit}>

                    <div className="grp">
                        <label htmlFor="url">Youtube Url</label>
                        <textarea onChange={e => setUrl(e.target.value)} className="input" name="url" required={true}/>
                    </div>

                    <div className="grp">
                        <p>Choose a format: </p>
                        <div className="radios">

                            <div className="radio">
                                <label>MP3</label>
                                <input value="mp3" type="radio" name="format" checked={format === "mp3"} onChange={handleChange} required={true}/>
                            </div>

                            <div className="radio">
                                <label>MP4</label>
                                <input value="mp4" type="radio" name="format" checked={format === "mp4"} onChange={handleChange}/>
                            </div>

                        </div>
                    </div>

                    <div className="h-24">
                        <input type="submit" disabled={disabled} value="Convert" className="btn mt-7 border-b-2 border-bluec hover:border-b-4"/>
                    </div>

                </form>

                <div className="flex flex-row justify-center mx-24">
                    {
                        downloadLink &&
                        (
                            // className={isClicked ? "hidden" : "visible"}
                            <a href={downloadLink} download={`yt-vid.${format}`} onClick={handleDownloadClick} className={isClicked ? "hidden" : "visible"} >
                                <button
                                    className="btn border-b-2 border-orangec hover:bg-orangec hover:text-white">
                                    Download
                                </button>
                            </a>
                        )
                    }
                    {
                        loader
                            ?
                            <p>
                                <img src="/processing.png" alt="loader" className="w-16 h-16 animate-spin"/>
                            </p>
                            :
                            <p></p>
                    }
                </div>

            </div>
        </div>
    );
}

export default New;