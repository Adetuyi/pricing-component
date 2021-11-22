import "./App.css";
import Navbar from "./components/Navbar";
import InfoBox from "./components/InfoBox";
import Spinner from "./components/Spinner";
import Map from "./components/Map";
import { useFetchDetails } from "./hooks/useFetch";

function App() {
    const {
        ipAddress,
        setIpAddress,
        location,
        timeZone,
        isp,
        loading,
        position,
    } = useFetchDetails();

    return (
        <>
            <Navbar setIpAddress={setIpAddress} />
            <InfoBox
                ipAddress={ipAddress}
                location={location}
                timeZone={timeZone}
                isp={isp}
            />
            {loading && <Spinner />}
            <Map position={position} />

            <div className="attribution">
                Challenge by
                <a
                    href="https://www.frontendmentor.io?ref=challenge"
                    target="_blank"
                    rel="noreferrer"
                >
                    Frontend Mentor
                </a>
                . Coded by
                <a href="http://github.com/Adetuyi">Adetuyi Oluwaseyi</a>.
            </div>
        </>
    );
}

export default App;
