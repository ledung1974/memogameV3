import React from "react";
import '../css/level.css';
import {FromGameProvider} from "../contexts/GameProvider";

export default function LevelMemo() {
    const {changeLevel,level} = FromGameProvider();
    
    const handleLevelChange = (event) => {
        changeLevel(parseInt(event.target.value));
    }

    return (
        <div className="div-level">
                <input  id="hard_level" className="toggle-left"
                        type="radio" name="level" value="52" 
                        onChange={handleLevelChange}  
                        checked ={level === 52}
                />
                <label htmlFor="hard_level" className="label-button">Hard</label>

                <input  id="easy_level" className="toggle-right"
                        type="radio" name="level" value="16" 
                        onChange={handleLevelChange}  
                        checked ={level === 16}
                />
                <label htmlFor="easy_level" className="label-button">Easy</label>
        </div>
    )
} 