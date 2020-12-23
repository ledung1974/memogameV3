import React from "react";
import {FromStatusProvider} from "../contexts/StatusProvider";
import StartMemo from "../pages/StartMemo";
import MainMemo from "../pages/MainMemo";


//-------------------------------

export default function Pages() {

    const {currentStatus} = FromStatusProvider()

    return (
        <div className="app-container">
            {currentStatus.isLoggedIn ? <MainMemo />
                    : <StartMemo />
            }
        </div>
    )
}
