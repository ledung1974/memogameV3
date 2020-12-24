import React from 'react';
import {scrSounds} from '../js/sound.js';

export default function AudioMemo() {
    return (
        <>
            {scrSounds.map((e,i) => ( 
                 <audio key={i} id={e.id} src={e.soundscr} controls="none" preload="auto"></audio>
            ))}
        </>
    )
}