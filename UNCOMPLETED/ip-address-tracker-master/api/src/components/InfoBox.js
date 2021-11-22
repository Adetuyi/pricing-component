import React from "react";

const InfoBox = ({ ipAddress, location, timeZone, isp }) => {
    return (
        <div className="info-box">
            <span
                id="collapse"
                onClick={e => {
                    e.target.parentElement.classList.toggle("shrink");
                    e.target.textContent === "-"
                        ? (e.target.textContent = "+")
                        : (e.target.textContent = "-");
                }}
            >
                -
            </span>
            <div className="section">
                <div className="head">IP Address</div>
                <p className="bold ip">{ipAddress}</p>
            </div>
            <div className="section">
                <div className="head">Location</div>
                <p className="bold location">{location}</p>
            </div>
            <div className="section">
                <div className="head">Timezone</div>
                <p className="bold time">{timeZone}</p>
            </div>
            <div className="section">
                <div className="head">ISP</div>
                <p className="bold isp">{isp}</p>
            </div>
        </div>
    );
};

export default React.memo(InfoBox);
