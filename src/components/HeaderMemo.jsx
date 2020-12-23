import {logo} from "../contexts/GameProvider";
import "../css/header.css";
import {FromPlayerProvider} from '../contexts/PlayerProvider';
import {FromStatusProvider} from '../contexts/StatusProvider';
import WeatherMemo from '../components/WeatherMemo';

export default function HeaderMemo() {
    
    const {player} = FromPlayerProvider();
    const {updateAlert} = FromStatusProvider();

    const onSignOutClick = () => {
        updateAlert({
            isShowedAlert: true,
            alertHeader: "MemoGame ask your confirmation",
            alertContent: `Hi ${player.playerName} !. Do you want to sign out ?.`,
            alertButtonName: "Sign Out",
            isButton2: true,
            alertButtonName2: "Cancel",
            buttonClicked:0
        });
    }

    const onClickPlyerName = () => {
        updateAlert({
            isShowedAlert: true,
            alertHeader: "Your MemoGame information!",
            alertContent: 
`Your name:[ ${player.playerName}]  
Your best score in Easy level:[ ${player.bestEasyScore}] 
Your best clicks in Easy level:[ ${player.bestEasyClicks}]
Your best score in Hard level:[ ${player.bestHardScore}]
Your best click in Hard level:[ ${player.bestHardClicks}]
Your order in the world:[111]
            `,
            alertButtonName: "Close",
            isButton2: false,
            buttonClicked:0
        });
    }
    return (
        <header className="main-header">
            <img src={logo} className="main-header_logo" alt="logo" />
            <h1>Memo Game</h1>
            <WeatherMemo />
            <p className="guide-text">Click any card to start!. Try your best to memorize the positions of these pair on the deck - likes this pair </p>
            <img className="guide-image" src="../images/pairofcard.png" alt="pairofcard" />
            <div className="div-name-signout">
                <button type="button" onClick={onSignOutClick}>Sign Out</button>
                <p className="header_playerName" onClick={onClickPlyerName}>{player.playerName}</p>
            </div>
        </header>

    )
}


