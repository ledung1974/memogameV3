import React, { useState, createContext, useContext } from "react";

export const StatusContext = createContext();
export const FromStatusProvider = () => useContext(StatusContext);

export default function StatusProvider(props) {
    const [currentError, setCurrentError] = useState(null);
    const [currentStatus, setCurrentStatus] = useState({
        isLoggedIn:false,//After player is logged in --> true
        isTimerStart:false,//Only start after first click on any card    
        isGameOver:false,//Over limit time
        isGameFinish:false,//When all cards on the deck are flipperd
        resetCount:0, //Counting reset password click
    });

    
    const [alertInfor, setAlertInfor] = useState({
        isShowedAlert: false,
        alertHeader: "MemoGame Alert !",
        alertContent: "Hello Player",
        alertButtonName: "OK",
        isButton2: true,
        alertButtonName2: "Cancel",
        buttonClicked:0
    });

    const updateAlert = (alertControl) => {
        let newAlertInfor = {...alertInfor,...alertControl}
        setAlertInfor(newAlertInfor);
    };

    const updateStatus = (newStatus, alertControl) => {
        let status = {...currentStatus,...newStatus};
        setCurrentStatus(status);
        if (alertControl !== null) {
            updateAlert(alertControl);
        }
    };

    const resetCurrentStatus = () => {
        updateStatus({
            isTimerStart:false,//Only start after first click on any card    
            isGameOver:false,//Over limit time
            isGameFinish:false,//When all cards on the deck are flipperd
        },null);
    } 

    const updateError = (error, header) => {
        setCurrentError(error);
        let alert = alertInfor;
        alert = {
            ...alert,
            isShowedAlert: true,
            alertHeader: header,
            alertContent: error.message,
            alertButtonName: "Close",
            isButton2: false
        };
        updateAlert(alert);
    };

    const clearError = () => {
        setCurrentError(null);
    };

    return (
        <StatusContext.Provider
            value={{
                currentStatus,resetCurrentStatus, updateStatus,
                alertInfor, updateAlert,
                currentError,updateError, clearError
            }}
        >
            { props.children}
        </ StatusContext.Provider>
    )
}