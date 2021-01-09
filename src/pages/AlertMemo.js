import React from "react";
import "../css/alert.css";
import {FromStatusProvider} from "../contexts/StatusProvider";
import {FromPlayerProvider} from "../contexts/PlayerProvider";

export default function AlertMemo() {
    const {alertInfor,updateAlert} = FromStatusProvider();
    const {handleSignOut} = FromPlayerProvider();
    
    const handleClickButton1 = () =>{
        updateAlert ({isShowedAlert:false,buttonClicked:1});
        if (alertInfor.alertButtonName === "Sign Out"){
            handleSignOut();
        }
    }

    const handleClickButton2 = () =>{
        updateAlert ({isShowedAlert:false,buttonClicked:2});
    }

    if (alertInfor.isShowedAlert) {
        return (
            <div className="alert-container">
                <div className="alert-div wd-1">
                    <div className="alert-header-div">
                        <h2>{alertInfor.alertHeader}</h2>
                    </div>
                    <div className="alert-content-div">
                        <p>{alertInfor.alertContent}</p>
                    </div>
                    <div className="alert-button-div">
                        <button type="button" onClick={handleClickButton1}>{alertInfor.alertButtonName}</button>
                        {alertInfor.isButton2 ? <button type="button" onClick={handleClickButton2}>{alertInfor.alertButtonName2}</button>
                            : <></>
                        }
                    </div>
                </div>
            </div>
        )
    }else{
        return <> </>
    }
}
