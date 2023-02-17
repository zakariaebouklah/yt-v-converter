import React, {useEffect, useState} from 'react';
import Head from "next/head";
import axios from "axios";

function New(props) {

    const [url, setUrl] = useState('');
    const [format, setFormat] = useState("mp3");
    const [jwt, setJWT] = useState('');
    const [loader, setLoader] = useState('');

    const [downloadLink, setDownloadLink] = useState(null);

    useEffect(() => {
         setJWT(window.localStorage.getItem('auth-token'));
    }, [])

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

        setLoader("Loading...")

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
                }
                else
                {
                    /**
                     * TODO: Use React Hot toasts
                     */
                    alert("something went wrong");
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
                            <a href={downloadLink} download={`yt-vid.${format}`} >
                                <button>Download</button>
                            </a>
                        )
                }
                {
                    downloadLink
                    ?
                        <p>{loader}</p>
                    :
                        <p> </p>
                }
            </div>
        </div>
    );
}

export default New;