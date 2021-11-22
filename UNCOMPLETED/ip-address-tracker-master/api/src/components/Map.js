import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Map = ({ position: defaultPosition }) => {
    const [position, setPosition] = useState([51.505, -0.09]);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (defaultPosition === "") return;

        setPosition(defaultPosition);
        map.flyTo(defaultPosition);
    }, [defaultPosition, map]);

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            whenCreated={map => setMap(map)}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
        </MapContainer>
    );
};

export default React.memo(Map);
