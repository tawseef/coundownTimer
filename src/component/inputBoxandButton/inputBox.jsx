import { useState, useEffect } from "react";
import "./inputBox.css";

export default function inputBox(props) {
const [data, setData] = useState(0);
const [isActivate, setIsActivate] = useState(false);
const [inputDate, setInputDate] = useState(0);
const [timerId, setTimerId] = useState(null);


const startTimer = (args) => {
  clearInterval(timerId);
  const timer = setInterval(() => {
    calculation(data);
  }, 1000);
  setData(0);
  setTimerId(timer);
};

useEffect(() => {
  return () => clearInterval(timerId);
}, [timerId]);

const calculation = (data) => {
const presentDate = new Date();
const validDate = new Date(data);
if (validDate > presentDate) {
  const timeDiff = validDate.getTime() - presentDate.getTime();
  const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
  const hourDiff = Math.round(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minuteDiff = Math.floor(
    (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

  if (
    daysDiff <= 99 &&
    hourDiff <= 24 &&
    minuteDiff <= 60 &&
    secondDiff <= 60
  ) {
    props.settingData([daysDiff, hourDiff, minuteDiff, secondDiff, ""]);
  } else {
    props.settingData([0, 0, 0, 0, "Selected time is more than 100 days"]);
  }
} else {
  setIsActivate(false);
  props.settingData([
    0,
    0,
    0,
    0,
    "🎉 The countdown is over! What's next on your adventure? 🎉",
  ]);
  clearInterval(timerId);
}
};

const handleStart = () => {
setIsActivate(true);
startTimer(data);
};

const handleCancel = () => {
setIsActivate(false);
clearInterval(timerId);
props.settingData([0, 0, 0, 0, ""]);
};

useEffect(() => {
setData(inputDate);
}, [inputDate]);

return (
<div>
  <input
  className="inputBox"
    type="datetime-local"
    value={data}
    onChange={(e) => setData(e.target.value)}
  />
  <div>
    {!isActivate && <button  className="button" onClick={handleStart}> Start Timer </button>}
    {isActivate && <button className="button" onClick={handleCancel}> Cancel Timer </button>}
  </div>
</div>
);
}
