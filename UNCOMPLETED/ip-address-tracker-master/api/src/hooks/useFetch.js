import { useState, useEffect, useRef } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

export function useFetchDetails() {
    const initial = useRef(true);
    const [ipAddress, setIpAddress] = useState("X.X.X.X");
    const [location, setLocation] = useState("Planet Earth");
    const [timeZone, setTimeZone] = useState("UTC 0.00");
    const [isp, setIsp] = useState("XXXX");
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState("");

    //Initial and search fetch to show users Ip
    useEffect(() => {
        initial.current ? fetchDetails("") : fetchDetails(ipAddress);
    }, [ipAddress]);

    const fetchDetails = ipAddress => {
        setLoading(true);
        initial.current = false;

        fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`
        )
            .then(res => {
                return res.json();
            })
            .then(data => {
                updateDOM(
                    data,
                    setIpAddress,
                    setLocation,
                    setTimeZone,
                    setIsp,
                    setLoading,
                    setPosition
                );
            });
    };
    return {
        ipAddress,
        setIpAddress,
        location,
        timeZone,
        isp,
        loading,
        position,
    };
}

function updateDOM(
    data,
    setIpAddress,
    setLocation,
    setTimeZone,
    setIsp,
    setLoading,
    setPosition
) {
    if (data.code === 422) {
        setIpAddress("X.X.X.X");
        setLocation("Invalid location");
        setTimeZone("UTC 0:00");
        setIsp("XXXX");
    } else {
        setIpAddress(data.ip);
        setLocation(`${data.location.city}, ${data.location.country}`);
        setTimeZone(`UTC ${data.location.timezone}`);
        setIsp(data.isp);
        setPosition([data.location.lat, data.location.lng]);
    }
    setLoading(false);
}

//MAP

// const accessToken =
//     "pk.eyJ1Ijoic2V5aWFkZXQiLCJhIjoiY2t3OXE0cjlpM2Y1dDJvbnR3dmJibnRlMyJ9.u4L3AAhCbx8_RRgcrQ12rQ";

//TODO
/*
Domain search
*/
