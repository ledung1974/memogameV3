import React, { useState, createContext, useContext } from "react";
import { FromStatusProvider } from "../contexts/StatusProvider";
import { FromGameProvider } from "../contexts/GameProvider";
import { createPlayer, signIn, signOut, sendPasswordResetEmail } from "../firebasedb/auth";
import { getPlayer, savePlayer } from "../firebasedb/playerRepository";
import { soundGame } from '../js/sound';

export const PlayerContext = createContext();
export const FromPlayerProvider = () => useContext(PlayerContext);


export default function PlayerProvider(props) {
    const [player, setPlayer] = useState(null);
    const { resetCurrentStatus, currentStatus, updateStatus, updateError, clearError} = FromStatusProvider();
    const { resetGameStatus, getTopScoresFromDB,newShuffleCards } = FromGameProvider();

    const handleSignUp = async (email, password, playerName) => {
        let result = "";
        try {
            const authPlayer = await createPlayer(email, password);
            const playerData = {
                email: email,
                playerName: playerName,
                uid: authPlayer.user.uid,
                bestEasyScore: 600,
                bestEasyClicks: 60,
                bestHardScore: 6000,
                bestHardClicks: 600
            };
            await savePlayer(playerData);
            await getTopScoresFromDB();
            soundGame("Shuffle cards");
            newShuffleCards();
            setPlayer(playerData);//Set Player before updateStatus to show MainMemo
            resetCurrentStatus();
            resetGameStatus();
            let alertControl = {
                isShowedAlert: true,
                alertHeader: "Your account has been created",
                alertContent: "Start game now !",
                alertButtonName: "OK",
                isButton2: false
            };
            clearError();
            updateStatus({ isLoggedIn: true }, alertControl);//Re-Render to show MainMemo
            result = "OK";
        } catch (error) {
            //console.log(error);
            setPlayer(null);
            updateError(error, "Can't create your account by error");
            result = error.message;
        }
        return result;
    };

    const handleLogin = async (email, password) => {
        try {
            const authPlayer = await signIn(email, password);
            const playerData = await getPlayer(authPlayer.user.uid);
            setPlayer(playerData);//Set Player before updateStatus to show MainMemo
            resetCurrentStatus();
            resetGameStatus();
            await getTopScoresFromDB();
            soundGame("Shuffle cards");
            newShuffleCards();
            clearError();
            updateStatus({ isLoggedIn: true }, null); //At last --> Re-Render to show MainMemo
            return true;
        } catch (error) {
            //console.log(error);
            updateError(error, "Can't login by error");
            setPlayer(null);
            return false;
        }
    };

    const handleSignOut = async () => {
        try {
            soundGame("Sign out");
            await signOut();
            updateStatus({isLoggedIn: false, isGameFinish:false, isGameOver:false, isTimerStart:false}, null);//Re-Render to hide MainMemo and show StartMemo
            setPlayer(null);//Clear player after show StartMemo
            clearError();
        } catch (error) {
            //console.log(error);
            updateError(error, "Sign out has an error: ");
        }
    };

    const handledSentResetEmail = async (email) => {
        if (currentStatus.resetCount > 2) {
            let error = {"message":`You has just sent ${currentStatus.resetCount} password reset email. Please don't sent too much !`}
            updateError(error, "Request a password reset email has an error:");
        } else {
            try {
                await sendPasswordResetEmail(email);
                let alertControl = {
                    isShowedAlert: true,
                    alertHeader: "A password reset email has been sent  [" + (currentStatus.resetCount + 1)+"]",
                    alertContent: "Please check your email: " + email,
                    alertButtonName: "OK",
                    isButton2: false
                };
                updateStatus({ resetCount: currentStatus.resetCount + 1 }, alertControl)
                clearError();
            } catch (error) {
                //console.log(error);
                updateError(error, "Request a password reset email has an error:");
            }
        }
    };

    const updatePlayer = (player) =>{
        setPlayer(player);
    }
    return (
        <PlayerContext.Provider
            value={{
                player,updatePlayer,
                handleSignUp,
                handleLogin,
                handleSignOut,
                handledSentResetEmail,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}
