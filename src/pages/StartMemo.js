import React, { useState } from "react";
import '../css/startpage.css';
import '../css/forms.css';
import { logo } from '../contexts/GameProvider';
import Login from '../forms/Login';
import Signup from '../forms/Signup';
import LevelMemo from '../components/LevelMemo.jsx'
import ResetPassword from "../forms/ResetPassword";


export default function StartMemo(props) {
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isShowResetPassword, setIsShowResetPassword] = useState(false);

  const showSignUp = () => {
    setIsShowSignUp(true);
  }

  const hideSignUp = () => {
    setIsShowSignUp(false);
  }

  const showResetPassword = () => {
    setIsShowResetPassword(true);
  }

  const hideResetPassword = () => {
    setIsShowResetPassword(false);
  }

  //Checking the Webapp is running on Mobile or not 
  let onMobile = "";
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    onMobile = "MemoGame is running on your Mobile device. Please set the screen's orientation in landscape after login";
  }

  return (
    <div className="start-container">
      <header className="start-header">
        <img src={logo} className="start-logo" alt="logo" />
        <h1>Memo Game</h1><span>Version 3.1</span>
      </header>
      <div className="start-main">
        {isShowSignUp ? <Signup hideSignUp={hideSignUp} />
          : isShowResetPassword ? <ResetPassword hideResetPassword={hideResetPassword} />
            : <>
              <LevelMemo />
              <Login showSignUp={showSignUp}
                showResetPassword={showResetPassword}
              />
            </>
        }
      </div>

      <footer>
        <p>{onMobile}</p>
        <p>MemoGame by Le Dung &#169; 2020</p>
      </footer>
    </div>
  );
}