import React, { useState } from 'react';
import '../css/mainpage.css';

import HeaderMemo from "../components/HeaderMemo.jsx";
import DeckMemo from "../components/DeckMemo.jsx";
import SidebarMemo from "../components/SidebarMemo.jsx";
import FooterMemo from "../components/FooterMemo.jsx";
import TimerHook from "../components/TimerHook.jsx";

import { soundGame } from '../js/sound.js';

import { FromStatusProvider } from '../contexts/StatusProvider';
import { FromGameProvider } from '../contexts/GameProvider';

export default function MainMemo() {
   
    const [isRestart, setIsRestart] = useState(true);
    const { resetGameStatus, newShuffleCards } = FromGameProvider();
    const { resetCurrentStatus} = FromStatusProvider();

    const restartGame = () => {
        resetGameStatus();
        resetCurrentStatus();
        soundGame("Shuffle cards");
        newShuffleCards();
        setIsRestart(!isRestart);
        //Toggle isRestart to change state of MainMemo component --> re-render
    }

   
    
    return (
        <div className="main-container">
            <HeaderMemo />
            <div className="div-deck">
                <DeckMemo />
                <SidebarMemo restartGame={restartGame} />
            </div>
            <FooterMemo />
            <TimerHook />
        </div>
    )
}