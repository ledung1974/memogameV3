import React, { useEffect, useRef } from 'react';
import { soundGame } from "../js/sound.js";
import { FromStatusProvider } from '../contexts/StatusProvider';
import { FromGameProvider } from '../contexts/GameProvider';

export default function DivImageCard(props) {

    const { gameStatus, updateGameStatus, updateCardStatus } = FromGameProvider();
    const { currentStatus, updateStatus } = FromStatusProvider();

    const didMountRef = useRef(false)
    useEffect(() => {
        if (didMountRef.current) {
            //componentDidUpdate()
            if (window.$isOnEventDeckChange) {
                //console.log("isOnEventDeckChange -> false")
                updateGameStatus({ isOnEventDeckChange: false });
            }
        } else {//componentDidMount()
            //console.log("componentDidMount");
            didMountRef.current = true;
            updateGameStatus({ isOnEventDeckChange: false });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cardStatus]);


    const flipCard = () => {
        if (!gameStatus.isOnEventDeckChange) {
            if (!currentStatus.isGameFinish && !currentStatus.isGameOver && !props.cardStatus.isShowed) {
                if (!currentStatus.isTimerStart) {//The first click will start Clock Memo
                    updateStatus({ isTimerStart: true });
                };

                if (gameStatus.flippedCards.length < 2) {
                    gameStatus.flippedCards.push(props.cardStatus.cardName);
                    gameStatus.thisSetStates.push(props.keyCard);
                    let temp = gameStatus.yourClicks +=1;
                    updateGameStatus({
                        flippedCards: gameStatus.flippedCards,
                        thisSetStates: gameStatus.thisSetStates,
                        yourClicks: temp,//counting your clicks to flip a card
                    });

                    updateCardStatus(props.keyCard, { isShowed: !props.cardStatus.isShowed });
                    soundGame("Flip a card");
                    if (gameStatus.flippedCards.length === 2) {
                        //Check the pair of flipped cards 
                        let card1 = gameStatus.flippedCards[0];
                        let card2 = gameStatus.flippedCards[1];
                        if (card1[0] === card2[0]) {
                            const suitsCheck = card1[1] + card2[1];
                            const suitPairs = ["DH", "HD", "CS", "SC"];
                            if (suitPairs.includes(suitsCheck)) {
                                updateGameStatus({ isCorrectCard: true, isOnEventDeckChange: true });
                            } else {
                                updateGameStatus({ isFlipBackPairCards: true, isOnEventDeckChange: true });
                            }
                        } else {
                            updateGameStatus({ isFlipBackPairCards: true, isOnEventDeckChange: true });
                        }
                    }
                }
            }
        }
        else {//Accept click on the next-card during a pair of previous cards on processing
            if (!gameStatus.isNextCard) {
                let temp = gameStatus.yourClicks +=1;
                updateGameStatus({
                    isOnEventDeckChange: false,
                    thisSetStatesNextCard: props.keyCard,
                    nextCardName: props.cardStatus.cardName,
                    isNextCard: true,
                    yourClicks: temp,//counting your clicks to flip a card
                });
                updateCardStatus(props.keyCard, { isShowed: !props.cardStatus.isShowed });
                soundGame("Flip a card");
            }
        }
    }

    if (!props.cardStatus.isOnDeck) {
        return (
            <div key={props.keyCard}>
                <img
                    key={props.keyCard + 100}
                    className="image-goodjob"
                    src="../images/goodjob.png"
                    alt="goodjob"
                />
            </div>
        )
    } else {
        if (!props.cardStatus.isShowed) {
            return (
                <div key={props.keyCard}>
                    <img
                        key={props.keyCard + 100}
                        className="image-card"
                        src="../images/back.png"
                        alt="back"
                        onClick={flipCard}
                    />
                </div>
            )
        }
        else {
            let scr = '../images/' + props.cardStatus.cardName + '.png';
            return (
                <div key={props.keyCard}>
                    <img
                        key={props.keyCard + 100}
                        className="image-card"
                        src={scr}
                        alt={props.cardStatus.cardName}
                    />
                </div>
            )
        }
    }
}


