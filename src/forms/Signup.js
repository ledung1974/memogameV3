import React, { useState } from "react";
import {FromPlayerProvider} from "../contexts/PlayerProvider";

export default function Signup(props) {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [playerName, setplayerName] = useState("");
    //for Enabled or Disabled inputs and buttons during async/await
    const [isSubmitting, setIsSubmitting] = useState(false);
     
    const { handleSignUp } = FromPlayerProvider();

    const handleSubmitSignUp = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();
        let result = await handleSignUp(email, password1, playerName);
        setIsSubmitting(false);
        if (result==="OK") {props.hideSignUp()}
    }

    return (
        <div className="signup-container">
            <form className="form-signup" onSubmit={(event)=>handleSubmitSignUp(event)}>
                <h2>Sign up</h2>
                <div className="input-div">
                    <div className="input-inline">
                        <img src="./images/email.png" alt="email" />
                        <input
                            required
                            value={email}
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
                            value={password1}
                            type="password"
                            name="password"
                            placeholder="Your password"
                            disabled={isSubmitting}
                            onChange={(event) => setPassword1(event.target.value)}
                        />
                    </div>
                    <br />
                    <div className="input-inline">
                        <img src="./images/password.png" alt="password" />
                        <input
                            value={password2}
                            type="password"
                            name="password"
                            placeholder="Type again your password"
                            disabled={isSubmitting}
                            onChange={(event) => setPassword2(event.target.value)}
                        />
                    </div>
                    <br />
                    <div className="input-inline">
                        <img src="./images/player.png" alt="player" />
                        <input
                            value={playerName}
                            type="text"
                            name="playerName"
                            maxLength="20"
                            placeholder="Name to display (max 20)"
                            disabled={isSubmitting}
                            onChange={(event) => setplayerName(event.target.value)}
                        />
                    </div>
                </div>
                <br />
                <div className="button-div">
                    <button type="submit"
                        disabled={!password1 || !password2 || password1 !== password2 
                                ||!email ||!playerName || isSubmitting}
                    >Sign Up</button>
                    <button disabled={isSubmitting} onClick={props.hideSignUp} type="cancel">Cancel</button>
                </div>
                <br/>
            </form>
            
        </div>
    )
}
