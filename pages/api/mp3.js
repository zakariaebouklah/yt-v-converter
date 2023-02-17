import axios from "axios";

export default async function mp3Conversion(req, res)
{

    // console.log(req.data.jwt ?? "jwt not found...");
    // console.log(req.data);

    // const jwt = window.localStorage.getItem('auth-token');

    const postedData = {
        yt_url: req.body.url
    };
    const postedConfig = {
      headers: {
          Authorization: `Bearer ${req.body.jwt}`
      }
    };

    let response = {};

    try {

        response = await axios.post(
            "http://localhost:8000/api/conversion/mp3",
            JSON.stringify(postedData),
            postedConfig
        );

    }
    catch (err) {
        console.log(err)
    }

    // const data = {message: "mp3 conversion end-point"};

    // res.status(200).json({keys: Object.keys(req.body)});
    // res.status(200).json({token: req.body.jwt, url: req.body.url});

    // res.status(200).json({keys: Object.keys(response.data), jwt: req.body.jwt})

    // res.status(200).json({bin: response.data});
    // res.status(200).json({data: response, message: "converted successfully to mp3 format..."});

    res.status(200).json(response.data);
}