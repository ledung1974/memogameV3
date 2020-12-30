import React from 'react';
import DivImageCard from "../components/DivImageCard.jsx";

import { FromGameProvider } from "../contexts/GameProvider";

export default function DeckMemo() {
     
    const {level,cardsStatus} = FromGameProvider();
    
    return (
        level === 52 ?
            <div className="divgrid-full-deck">
                {cardsStatus.map((element, i) => (
                    <DivImageCard key={i.toString()} keyCard={i} cardStatus={element} level={level}/>
                ))}
            </div>
            : <div className="divgrid-easy-deck">
                {cardsStatus.map((element, i) => (
                    <DivImageCard key={i.toString()} keyCard={i} cardStatus={element} level={level}/>
                ))}
            </div>
    )
}





