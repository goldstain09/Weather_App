import React, { useEffect, useState } from "react";
import "./CSS/InputAndInfo.scss";
import { MagnifyingGlass } from "react-loader-spinner";
import logo from "../video/logo.png";

export default function InputAndInfo({ gettingDAYNIGHT_Value }) {
  // for setting up Live time
  const [liveTime, setLiveTime] = useState(new Date());
  // for setting placeholder
  const [placeholder, setPlaceholder] = useState("Kolkata");
  useEffect(() => {
    const time = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    const Placeholder = setInterval(() => {
      setPlaceholder((prevPlaceholder) => {
        if (prevPlaceholder === "Kolkata") {
          return "India";
        } else if (prevPlaceholder === "India") {
          return "Canada";
        } else if (prevPlaceholder === "Canada") {
          return "Noida";
        } else {
          return "Kolkata";
        }
      });
    }, 2000);

    return () => {
      clearInterval(time);
      clearInterval(Placeholder);
    };
  }, []);

  // Input
  const [input, setInput] = useState("");

  // setting error for location can't found
  const [locationError, setLocationError] = useState(false);

  // if Data is received properly
  const [received, setReceived] = useState(false);

  // api data
  const [data, setData] = useState({});

  // onChecking Getting Data from api
  const Checking = async (e) => {
    // setting first letter in capital case just for looking good;;;
    let Input_value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setInput(Input_value);
    try {
      // i will give this condition because i try so much time this api gives any city data on inputing minimum three digit...
      if (Input_value.length > 1) {
        let f_response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=76d3d506f3054689924160021231206&q=${Input_value}&aqi=no`
        );
        let s_response = await f_response.json();
        console.log(s_response);
        // i saw that it gives error in  response when there is no match so that i give this condition...
        // for setting error of no match....
        if ("error" in s_response) {
          setLocationError(true);
          setReceived(false);
        } else if ("location" in s_response) {
          console.log(s_response);
          setData(s_response);
          setReceived(true);
          setLocationError(false);
          gettingDAYNIGHT_Value(s_response.current.is_day);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main_Container">
        <div className="text-left Info_Div">
          <input
            placeholder={`eg; ${placeholder}`}
            type="search"
            value={input}
            onChange={Checking}
            onInput={() => {
              setReceived(false);
            }}
            autoFocus
            autoCorrect="on"
            autoComplete="on"
          />
          {received && (
            <div className="d-flex gap-5 justify-content-between">
              <div>
                <h1 className="place_name">{data.location.name}</h1>
              </div>
              <div>
                <h1 className="region_country">{`${data.location.region}, ${data.location.country}`}</h1>
              </div>
              <div>
                <h1 className="live_time">{liveTime.toLocaleString()}</h1>
              </div>
            </div>
          )}
          {locationError && (
            <div className="d-flex">
              <img src={logo} className="location_error_img" />
              <h1 className="location_error"> OOPS! No Results Found...</h1>
            </div>
          )}
        </div>
        {/* ------------------OTHERS------------------- */}
        {received && (
          <>
            {" "}
            <div className="other_Info_Div d-flex row">
              <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                <div className="d-flex gap-5">
                  <img
                    src={data.current.condition.icon}
                    className="weather_condition_img"
                  />
                  <h1>{data.current.condition.text}</h1>
                </div>
              </div>
              <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                <div className="d-flex gap-5">
                  <h1 className="Temp_c">{`${data.current.temp_c} 'C`}</h1>
                  <h1 className="Temp_f">{`${data.current.temp_f} 'F`}</h1>
                </div>
              </div>
              <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                <div className="d-flex gap-5">
                  <h1>{`Feels Like: ${data.current.feelslike_c} C'`}</h1>
                  <h1>{`& ${data.current.feelslike_f} F'`}</h1>
                </div>
              </div>
            </div>
            <div className="other_Info_Div d-flex row">
              <div className="col col-12  col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <h1>{`Humidity: ${data.current.humidity}%`}</h1>
                <h1>{`Pressure (inHG): ${data.current.pressure_in}`}</h1>
                <h1>{`Precipitation (in Inches): ${data.current.precip_in}`}</h1>
              </div>
              <div className="col  col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <h1>{`Wind Speed: ${data.current.wind_kph} KPH`}</h1>
                <h1>{`Wind Direction: ${data.current.wind_dir}`}</h1>
                <h1>{`Wind Degree: ${data.current.wind_degree}'`}</h1>
              </div>
              <div className="col  col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <h1>{`Gust ${data.current.gust_kph}KPH`}</h1>
                <h1>{`Visibility: ${data.current.vis_km}km`}</h1>
                <h1>
                  {data.current.is_day === 0 ? <h1>Night</h1> : <h1>Day</h1>}
                </h1>
              </div>
            </div>
          </>
        )}
        {locationError && (
          <>
            {" "}
            <div className="other_Info_Div d-flex row">
              <MagnifyingGlass
                visible={true}
                height="300"
                width="300"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
