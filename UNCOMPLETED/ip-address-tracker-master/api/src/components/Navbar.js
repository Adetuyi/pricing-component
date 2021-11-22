import React, { useState } from "react";
import arrow from "../images/icon-arrow.svg";

const Navbar = ({ setIpAddress }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <nav>
            <h1>IP Address Tracker</h1>
            <div className="search-area">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for any IP address or domain"
                    id="search-input"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div
                    className="search-btn"
                    onClick={() => setIpAddress(searchTerm)}
                >
                    <img src={arrow} alt=">" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
