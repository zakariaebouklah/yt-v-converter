import axios from "axios";

export default async function mp4Conversion(req, res)
{
    const postedData = {
        yt_url: req.body.url
    }

    const postedConfig = {
        headers: {
            Authorization: `Bearer ${req.body.jwt}`
        }
    }

    let response = {} ;

    try {
        response = await axios.post(
            "http://localhost:8000/api/conversion/mp4",
            JSON.stringify(postedData),
            postedConfig
        )
    }
    catch (err) {
        console.log(err);
    }

    res.status(200).json(response.data);
}