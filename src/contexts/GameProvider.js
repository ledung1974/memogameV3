import React, { useState, createContext, useContext } from "react";
import logoReact from "../contexts/logo.svg";
import { readFromDatabase } from "../firebasedb/topscoreRepository";
import { defaultTopScores } from "../firebasedb/defaultTopScore";
import { FromStatusProvider } from "../contexts/StatusProvider";
import { createCards } from "../js/cards.js";

const topX = 3;//Show only Top3
export const logo = logoReact;


const GameContext = createContext();
export const FromGameProvider = () => useContext(GameContext);


export default function GameProvider(props) {
   
    const [level, setLevel] = useState(16); //16 --> Easy, 52 --> Hard 
    const [timeLimit,setTimeLimit] = useState("01:30");//01:30 --> Easy, 06:00 -> Hard
    const [topScores, setTopScores] = useState(defaultTopScores);
    const [cardsStatus, setCardsStatus] = useState();
    
    const { updateError } = FromStatusProvider();


    const [gameStatus, setGameStatus] = useState({
        yourClicks: 0,//Your clicks on the cards
        yourCount: 0,//in seceonds
        numberCardsOnDeck: level,
        flippedCards: [],
        isCorrectCard: false,
        isFlipBackPairCards: false,
        thisSetStates: [],//Keep handle 2 components for 2 flipped cards
        thisSetStatesNextCard: -1,//Keep the key of the next-clicked card
        nextCardName: "",
        isNextCard: false,
        isOnEventDeckChange: false,
        forceUpdateTopScores: {},//Use to call function inside TopScoresMemo to force re-rendering  
        isTopScoresChanged: false,
    });

    const resetGameStatus = () => {
        setGameStatus({
            yourClicks: 0,//Your clicks on the cards
            yourCount: 0,//in seceonds
            numberCardsOnDeck: level,
            flippedCards: [],
            isCorrectCard: false,
            isFlipBackPairCards: false,
            thisSetStates: [],//Keep handle 2 components for 2 flipped cards
            thisSetStatesNextCard: -1,//Keep the key of the next-clicked card
            nextCardName: "",
            isNextCard: false,
            isOnEventDeckChange: false,
            isTopScoresChanged: false,
            forceUpdateTopScores: gameStatus.forceUpdateTopScores,//When restart --> have to keep function inside TopScoresMemo to force re-rendering
        })
    }

    const changeLevel = (level) => {
        setLevel(level);
        level === 16 ? setTimeLimit("01:30")
                    : setTimeLimit("06:00");
    };

    const getTopScoresFromDB = async () => {
        try {
            let response = [];
            if (level === 16) {
                response = await readFromDatabase(1, topX, '/topscoreseasy/');
            } else {
                response = await readFromDatabase(1, topX, '/topscoreshard/');
            }
            setTopScores(response);
        } catch (error) {
            updateError(error, "Can't get topscore from Database");
        }
    };

    const updateTopScore = (newTopScore) => {
        setTopScores(newTopScore);
    };

    const newShuffleCards = () => {
        let newCards = createCards(level);
        let newCardsStatus = [];
        newCards.forEach((card) => {
            let oneCardStatus = {
                cardName: card,
                isShowed: false,
                isOnDeck: true,
            }
            newCardsStatus.push(oneCardStatus);
        });
        setCardsStatus(newCardsStatus);
    }

    const updateCardStatus = (key, newStatus) => {
        let newCardsStatus = cardsStatus;
        let currentCardStatus = cardsStatus[key];
        newCardsStatus[key] = { ...currentCardStatus, ...newStatus };
        setCardsStatus(newCardsStatus);
    }

    const removeCardFromDeck = () => {
        let key1 = gameStatus.thisSetStates[0];
        let key2 = gameStatus.thisSetStates[1];
        let newCardsStatus = cardsStatus;
        newCardsStatus[key1].isOnDeck = false;
        newCardsStatus[key2].isOnDeck = false;
        setCardsStatus(newCardsStatus);

        if (!gameStatus.isNextCard) {
            updateGameStatus({
                isOnEventDeckChange: false,
                flippedCards: [],
                isCorrectCard: false,
                numberCardsOnDeck: gameStatus.numberCardsOnDeck - 2,
                thisSetStates: [],
                isNextCard: false,
                thisSetStatesNextCard: -1,
                nextCardName: "",
            });
        } else {
            let tempthisSetStates = [];
            tempthisSetStates.push(gameStatus.thisSetStatesNextCard);
            let tempflippedCards = [];
            tempflippedCards.push(gameStatus.nextCardName);
            updateGameStatus({
                isOnEventDeckChange: false,
                flippedCards: tempflippedCards,
                isCorrectCard: false,
                numberCardsOnDeck: gameStatus.numberCardsOnDeck - 2,
                thisSetStates: tempthisSetStates,
                isNextCard: false,
                thisSetStatesNextCard: -1,
                nextCardName: "",
            });
        }
        setCardsStatus(newCardsStatus);
    }


    const flipBackPairCards = () => {
        let key1 = gameStatus.thisSetStates[0];
        let key2 = gameStatus.thisSetStates[1];
        let newCardsStatus = cardsStatus;
        newCardsStatus[key1].isShowed = false;
        newCardsStatus[key2].isShowed = false;

        if (!gameStatus.isNextCard) {
            updateGameStatus({
                isOnEventDeckChange: false,
                flippedCards: [],
                isFlipBackPairCards: false,
                isCorrectCard: false,
                thisSetStates: [],
                isNextCard: false,
                thisSetStatesNextCard: -1,
                nextCardName: "",
            });
        } else {
            let tempthisSetStates = [];
            tempthisSetStates.push(gameStatus.thisSetStatesNextCard);
            let tempflippedCards = [];
            tempflippedCards.push(gameStatus.nextCardName);
            updateGameStatus({
                isOnEventDeckChange: false,
                flippedCards: tempflippedCards,
                isFlipBackPairCards: false,
                isCorrectCard: false,
                thisSetStates: tempthisSetStates,
                isNextCard: false,
                thisSetStatesNextCard: -1,
                nextCardName: "",
            });
        }

        setCardsStatus(newCardsStatus);
    }

    const updateGameStatus = (newStatus) => {
        let status = { ...gameStatus, ...newStatus };
        setGameStatus(status);

    };
   
    return (
        <GameContext.Provider
            value={{
                resetGameStatus, 
                timeLimit, level, changeLevel,
                cardsStatus, newShuffleCards, updateCardStatus,
                topScores, getTopScoresFromDB, updateTopScore,
                gameStatus, updateGameStatus,
                flipBackPairCards, removeCardFromDeck,
            }}
        >
            { props.children}
        </ GameContext.Provider>
    )
}