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
            clearInterval(timeHandler.current);
        };
    }, [isRunning]);

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white m-5">
                <h1>{"Let's Crack CAT 2024"}</h1>
            </div>
            <div className="text-xs font-bold text-white mb-20">
                <h1>{"by Aviral Srivastava"}</h1>
            </div>
            <div className="text-2xl font-bold text-white bg-black w-40 h-40 flex items-center justify-center rounded-full border-4 border-gray-800 mb-4">
                {formatTime(totalTime)}
            </div>

            <div className="text-xl text-black bg-gray-200 w-32 h-32 flex items-center justify-center rounded-full mb-4">
                {formatTime(time)}
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => {
                        setIsRunning(true);
                    }}
                >
                    Start
                </button>

                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => {
                        setIsRunning(false);
                    }}
                >
                    Stop
                </button>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => {
                        setIsRunning(false);
                        setTimeArr((prevArr) => [...prevArr, time]);
                        setTime(0);
                        setIsRunning(true);
                    }}
                >
                    Next
                </button>

                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    onClick={() => {
                        setIsRunning(false);
                        setTotalTime(0);
                        setTime(0);
                        setTimeArr([]);
                    }}
                >
                    Reset
                </button>
            </div>

            <div className="w-full max-w-md text-left">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {timeArr.length !== 0 ? "Time Per Question:" : ""}
                </h3>
                <ul className="space-y-2">
                    {timeArr.map((quesTime, index) => (
                        <li
                            key={index}
                            className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-300 text-gray-900"
                        >
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
