import React from 'react';
import {scrSounds} from '../js/sound.js';

export default function AudioMemo() {
    return (
        <>
            {scrSounds.map((e,i) => ( 
                 <audio key={i.toString()} id={e.id} src={e.soundscr} preload="auto"></audio>
            ))}
        </>
    )
}
