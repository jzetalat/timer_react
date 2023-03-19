import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AlarmOnSharpIcon from '@mui/icons-material/AlarmOnSharp';
import { COLORS, VALUES } from "../Constants/constants";


const Timer = () => {
    const [seconds, setSeconds] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [hoverText, setHoverText] = useState("");

    useEffect(() => {  
        let intervalId;
        if (seconds !== null && seconds > 0 && !isPaused) {
        intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        } else if (seconds === 0) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);      
    }, [seconds, isPaused]);

    const handleStartTimer = () => {
        setSeconds(VALUES.COUNTDOWN_VALUE);
    };

    const handleTimerClick = () => {
        setSeconds(null);
    };

    const handleTimerHover = () => {
        setIsPaused(true);
        if (seconds === 0) {
            setHoverText("countdown is over");
        } else {
            setHoverText("Paused...");
        }
    };

    const handleTimerLeave = () => {
        setIsPaused(false);
    };

    return (
        <div className="timer-container">
            {seconds === null ? (
                <Button variant="contained" 
                        color={COLORS.BUTTON_COLOR} 
                        onClick={handleStartTimer}
                        endIcon={<AlarmOnSharpIcon/>}
                >
                    Start timer
                </Button>
            ) : (
                <div
                    className="timer"
                    data-testid="timer"
                    onClick={handleTimerClick}
                    onMouseEnter={handleTimerHover}
                    onMouseLeave={handleTimerLeave}
                >
                {isPaused ? hoverText : seconds}
                </div>
            )}
        </div>
    );
};

export default Timer;
