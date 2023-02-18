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

        setLoader(true);

        e.target.reset();

        const postToApiEndPoint = async (endpoint) => {
            try {
                console.log(url);
                const response = await axios.post(endpoint, {url, jwt}, configData);
                // console.log(response.data);
                /* get the binary file as a js Blob */
                console.log(response);
                console.log("------------")
                // const binData = new Blob([response.data.bin], { type: "audio/mpeg" });
                /* create downloadLink based on binary data */
                // const link = URL.createObjectURL(binData);

                /**
                 * TODO: if jwt is expired we need to tell the user to reconnect of redirect him to /login
                 */

                if(response.data.success)
                {
                    setDownloadLink(response.data.link);
                    setLoader(false);
                    setIsClicked(false);
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
                console.log(err)
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
                <form method="POST" className="form-login" id="conversion-form" onSubmit={handleSubmit}>

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
                        <input type="submit" value="Convert" className="btn mt-7"/>
                    </div>

                </form>
            </div>

            <div>
                {
                    downloadLink &&
                        (
                            <a href={downloadLink} download={`yt-vid.${format}`} onClick={handleDownloadClick} className={isClicked ? "hidden" : "visible"} >
                                <button>Download</button>
                            </a>
                        )
                }
                {
                    loader
                    ?
                        <p>Loading...</p>
                    :
                        <p></p>
                }
            </div>
        </div>
    );
}

export default New;