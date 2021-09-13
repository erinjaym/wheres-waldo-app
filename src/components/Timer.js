import React from "react";
import { useState, useEffect } from "react"; 

const Timer = () => {
    
const [time, setTime] = useState (0);

useEffect (() => {
    const interval = setInterval(() => {
        setTime(time => time + 10);
    }, 10);
    return () => clearInterval(interval);
}, []);

return (
    <div id="timer-display" className="timer-display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
    </div>
);

}

export default Timer; 