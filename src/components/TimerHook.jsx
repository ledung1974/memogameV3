import React, { useState, useEffect, useRef} from "react";
import { FromStatusProvider } from "../contexts/StatusProvider";
import { FromGameProvider } from "../contexts/GameProvider";
import {FromPlayerProvider} from '../contexts/PlayerProvider';
import {savePlayer} from '../firebasedb/playerRepository';
import { soundGame } from '../js/sound';
import { updateTopScores, updateBestScore } from '../js/score';

let delay = 0;

export default function TimerHook() {
    const [countMiliSecond, setCountMiliSecond] = useState(0);
    
    const { currentStatus, updateStatus } = FromStatusProvider();
    const {level,gameStatus, updateGameStatus, removeCardFromDeck,flipBackPairCards,topScores} = FromGameProvider();
    const {player,updatePlayer} = FromPlayerProvider();

    const timerInMiliSecond = useRef(null);
    
    useEffect(() => {
        timerInMiliSecond.current = setInterval(() => setCountMiliSecond((c) => c + 1), 1); //1ms
        //console.log("DidMout and timeInMiliSecond has run !");

        return () => {
            //console.log("Unmount and Clear timerInMiliSecond")
            clearInterval(timerInMiliSecond.current);
        }
    }, []);


    if (countMiliSecond>3000) {setCountMiliSecond(0)} 

    //PROCESS IN MILISECOND --------------------------------
    //Has logged in
    if (currentStatus.isLoggedIn) {
        //Have just started Game Memo
        if (currentStatus.isTimerStart) {
            if (!gameStatus.isOnEventDeckChange) {
                //If you have just flipped a correct card 
                if (gameStatus.isCorrectCard) {
                    //updateGameStatus({ isOnEventDeckChange: true });//Disable mouse click when remove cards
                    gameStatus.isOnEventDeckChange=true;
                    delay = 1;//Start count for delay
                } else {   //If you have just flipped a wrong card
                    if (gameStatus.isFlipBackPairCards) {
                        //updateGameStatus({ isOnEventDeckChange: true });//Disable mouse click when remove cards
                        gameStatus.isOnEventDeckChange=true;
                        delay = 1;//Start count for delay
                    } else {
                        if (gameStatus.numberCardsOnDeck === 0) {
                            soundGame("Well done");
                            //updateStatus({isGameFinish: true }, null);
                            currentStatus.isGameFinish = true;
                            gameStatus.numberCardsOnDeck = level;//Set back level to update Score
                        }
                    }
                }

            } else {
                if (gameStatus.isNextCard || delay === 150 || delay === 500) {
                    if (gameStatus.isCorrectCard) {
                        delay = 0;
                        removeCardFromDeck();
                    } else {
                        if (delay === 150) {
                            delay = 151;
                        } else {
                            if (gameStatus.isFlipBackPairCards) {
                                delay = 0;
                                flipBackPairCards();
                                soundGame("Flip a card");
                            }
                        }
                    }
                } else {
                    delay += 1;
                    if (delay === 50) {
                        if (gameStatus.isCorrectCard) { soundGame("Correct card"); }
                        if (gameStatus.isFlipBackPairCards) { soundGame("Wrong card"); }
                    }
                }

            }
        } else {
            if (currentStatus.isGameFinish && gameStatus.numberCardsOnDeck===level){
                //update TopScores
                let isTopScoresChanged = updateTopScores(player.uid, player.playerName, gameStatus.yourCount, gameStatus.yourCount, topScores);
                //Call function inside TopScoresMemo to force re-rendering
                if (isTopScoresChanged) { 
                    //updateGameStatus({isTopScoresChanged:true, numberCardsOnDeck:level});
                    gameStatus.isTopScoresChanged=true;
                    gameStatus.forceUpdateTopScores()
                    isTopScoresChanged = false; 
                }else{
                    //updateGameStatus({isTopScoresChanged:false, numberCardsOnDeck:level});
                    gameStatus.isTopScoresChanged=false;
                }
                //Update Best Score of current player
                let isBestScoreUpdate = updateBestScore(level, player, gameStatus.yourCount, gameStatus.yourCount)
                if (isBestScoreUpdate) {
                    savePlayer(player);//Write to Database
                    updatePlayer(player);
                }
                delay = 0;
                gameStatus.numberCardsOnDeck=level+1;
            }
        }

    } else {
        delay = 0;
    }


    return (
        <>
        </>
    )
}