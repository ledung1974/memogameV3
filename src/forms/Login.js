import React, { useState } from "react";
import {FromPlayerProvider } from "../contexts/PlayerProvider";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //for Enabled or Disabled inputs and buttons during async/await
    const [isSubmitting, setIsSubmitting] = useState(false);
        
    const { handleLogin } = FromPlayerProvider();

    const handleSubmitLogin = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();
        await handleLogin(email, password);
        setIsSubmitting(false);
    }

    return (
        <div className="login-container" onSubmit={handleSubmitLogin}>
            <form className="form-login">
                <div className="input-div">
                    <div className="input-inline">
                        <img src="./images/email.png" alt="email" />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            disabled={isSubmitting}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <br />
                    <div className="input-inline">
                        <img src="./images/password.png" alt="password" />
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="Your password"
                            disabled={isSubmitting}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                </div>
                <div>
                    <button className="button-login" type="submit" disabled={isSubmitting}>Start Game</button>
                </div>
                <button disabled={isSubmitting} onClick={props.showResetPassword} id="reset-password-button">Reset password ?</button>
            </form>
            <div className="sign-up-button">
                <span>Please <button id="sign-up-link" disabled={isSubmitting} onClick={props.showSignUp}> Sign Up </button> for the first time to play</span>
            </div>
        </div>
    )
}
