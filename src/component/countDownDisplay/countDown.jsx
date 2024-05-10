import { useState } from "react";
import Navbar from "../navHeading/navBar";
import InputBox from "../inputBoxandButton/inputBox";
import "./countDown.css";

export default function countDown() {
  const [gotData, setGotData] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    text: "",
  });
  const targetData = (data) => {
    const [day, hour, minute, second, text] = data;
    setGotData({
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      text: text,
    });
  };

  const cancel = () => {
    setGotData({
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      text: "",
    });
  };


  return (
    <div className="countDown">
      <Navbar />
      <InputBox settingData={targetData} cancelation={cancel} />
      <div className="container">
        {gotData.text.length === 0 ? (
          <>
            <div className="display">
              <span className="text">
              {gotData.day} <br />
              </span>
              Days
            </div>
            <div className="display">
            <span className="text">{gotData.hour}<br /> </span>
            
              Hours
            </div>
            <div className="display">
            <span className="text">{gotData.minute}<br /> </span>
              Minutes
            </div>
            <div className="display">
            <span className="text">{gotData.second}<br /> </span> 
              Seconds
            </div>
          </>
        ) : (
          <>{gotData.text}</>
        )}
      </div>
    </div>
  );
}
