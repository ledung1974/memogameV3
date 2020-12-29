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
        <div className="login-container wd-1" onSubmit={handleSubmitLogin}>
            <form className="form-login col-1">
                <div className="input-div">
                    <div className="input-inline">
                        <img src="./images/email.png" alt="email" />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            maxLength="30"
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
                            maxLength="20"
                            placeholder="Password"
                            disabled={isSubmitting}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button disabled={isSubmitting} onClick={props.showResetPassword} id="reset-password-button">Reset password ?</button>
                </div>
                <div>
                    <button className="button-login marpad-1" type="submit" disabled={isSubmitting}>Login</button>
                </div>
            </form>
            <div className="sign-up-link">
                <span> Please <button type="button" id="sign-up-button" disabled={isSubmitting} onClick={props.showSignUp}>Sign Up</button> for the first time to play
                </span>
            </div>
        </div>
    )
}
