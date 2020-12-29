/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { soundGame } from '../js/sound';
import { scoreToClock } from '../js/score';
import { FromStatusProvider } from '../contexts/StatusProvider';
import { FromGameProvider } from '../contexts/GameProvider';

export default function ClockMemo() {
    const [countSecond, setCountSecond] = useState(0);
    const { currentStatus, updateStatus } = FromStatusProvider();
    const {timeLimit, gameStatus, updateGameStatus } = FromGameProvider();


    const timerInSecond = useRef(null);
    useEffect(() => {
        timerInSecond.current = setInterval(() => setCountSecond((c) => c + 1), 1000); //1s
        //console.log("DidMout and timeInSecond has run !");

        return () => {
            //console.log("Unmount and Clear timerInSecond")
            clearInterval(timerInSecond.current);
        }
    }, []);

    const displayClock = () => {
        if (countSecond === 0) {
            return "00:00"
        } else {
            let stringClock = scoreToClock(countSecond)
            if (stringClock === timeLimit) {
                //Gameover ....
                updateStatus({ isTimerStart: false, isGameOver: true });
                soundGame("Game over");
            } else {
                if (currentStatus.isGameFinish) {
                    updateGameStatus({yourCount: countSecond-1});
                    updateStatus({ isTimerStart: false });
                }
            }
            return stringClock;
        }
    };

    let currentClock = "00:00";
    if (currentStatus.isTimerStart) {
        currentClock = displayClock();
    } else {
        if (countSecond > 0) {
            setCountSecond(0);
        }
    }


    if (currentStatus.isGameOver) {
        return (
            <div className="div-gameover">
                <p>GAME OVER!</p>
                <span className="digit-clock" id="clock_gameover">{timeLimit}</span>
                <br />
                <label>Your clicks: {gameStatus.yourClicks} </label>
            </div>
        )
    } else {
        if (currentStatus.isGameFinish) { //When finished all cards on the deck
            return (
                <div className="div-finish">
                    <p>WELL DONE!</p>
                    <span className="digit-clock" id="clock_finish">
                        {scoreToClock(gameStatus.yourCount)}
                    </span>
                    <br />
                    <label>Your clicks: {gameStatus.yourClicks} </label>
                </div>
            );

        } else { //When the player is playing --> the clock runs
            return (
                <div className="div-clock">
                    <p>YOUR TIME</p>
                    <span className="digit-clock" id="clock_game">{currentClock}</span>
                    <br />
                    <label>Your clicks: {gameStatus.yourClicks} </label>
                </div>
            );
        }
    }
}


