"use client";
import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeArr, setTimeArr] = useState([]);

    function formatTime(time) {
        if (!time) {
            return "0:00";
        }
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        let min = minutes.toString();
        let sec = seconds.toString();
        sec = "0" + sec;
        return `${min}:${sec.slice(-2)}`;
    }

    const timeHandler = useRef(null);

    // Effect for handling the timer when running
    useEffect(() => {
        if (isRunning) {
            timeHandler.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
                setTotalTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timeHandler.current);
        }

        return () => {
            clearInterval(timeHandler.current); // Cleanup on component unmount or when isRunning changes
        };
    }, [isRunning]);

    return (
        <div className="container">
            <div>Total Time: {formatTime(totalTime)}</div>
            <div>Current Time: {formatTime(time)}</div>

            <button
                onClick={() => {
                    setIsRunning(true); // Start the timer
                }}
            >
                Start
            </button>

            <button
                onClick={() => {
                    setIsRunning(false); // Stop the timer
                }}
            >
                Stop
            </button>

            <button
                onClick={() => {
                    setIsRunning(false); // Stop the timer
                    setTimeArr((prevArr) => [...prevArr, time]); // Store the current time in timeArr
                    setTime(0); // Reset the current time
                    setIsRunning(true); // restart the timer
                }}
            >
                Next
            </button>

            <button
                onClick={() => {
                    setIsRunning(false); // Stop the timer
                    setTotalTime(0); // Reset the total time
                    setTime(0); // Reset the current time
                    setTimeArr([]); // Clear the stored times
                }}
            >
                Reset
            </button>

            {/* Displaying all lap times */}
            <div>
                <h3>{timeArr.length != 0 ? "Time Per Question:" : ""}</h3>
                <ul>
                    {timeArr.map((quesTime, index) => (
                        <li key={index}>
                            {`Time for Question ${index + 1}: ${formatTime(
                                quesTime
                            )}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stopwatch;
