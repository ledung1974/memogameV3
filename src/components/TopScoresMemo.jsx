
import React, { useState, useEffect } from 'react'
import { writeToDatabase } from '../firebasedb/topscoreRepository';
import { scoreToClock } from '../js/score';
import { FromGameProvider } from '../contexts/GameProvider';
import { FromStatusProvider } from '../contexts/StatusProvider';
import { FromPlayerProvider } from '../contexts/PlayerProvider';

export default function TopScoresMemo() {
    const [isUpdated, setIsUpdated] = useState(false);

    const { level, topScores, gameStatus, updateGameStatus } = FromGameProvider();
    const { currentStatus } = FromStatusProvider();
    const { player } = FromPlayerProvider();

    useEffect(() => {
        let newGameStatus = {
            forceUpdateTopScores:function () {
                return setIsUpdated(!isUpdated);
            }
        };
        updateGameStatus(newGameStatus);
    }, [isUpdated]);

    const updateTopScoresOnFirebase = async () => {
        if (!currentStatus.isTimerStart && currentStatus.isGameFinish) {
            let i = 1;
            await topScores.forEach(playerScore => {
                level === 16 ? writeToDatabase(i, playerScore, '/topscoreseasy/')
                             : writeToDatabase(i, playerScore, '/topscoreshard/');
                i++;
            })
        }
 
        updateGameStatus({ isTopScoresChanged: false });
        setIsUpdated(!isUpdated);
    }

    return (
        <div className="div-topscores-container">
            <h4>TOP SCORES</h4>
            {level === 16 ? <h5>- Easy Level -</h5>
                : <h5>- Hard Level -</h5>
            }
            <div className="div-scroll-topscores">
                {topScores.map((element) => (
                    <div>
                        {element.uid === player.uid ? <p className="top-name">&#128525; {element.name}</p>
                            : <p className="top-name">{element.name}</p>
                        }

                        <p className="top-score">{scoreToClock(element.score)}~{element.clicks} clicks</p>
                    </div>
                ))}
            </div>
            {gameStatus.isTopScoresChanged ? <button id="button_update_firebase" onClick={updateTopScoresOnFirebase} type="button">Update to Firebase</button>
                : <p id="updated_firebase">- Updated from Firebase -</p>
            }
        </div>
    )
}

