import React, { useState } from "react";
import { FromPlayerProvider } from "../contexts/PlayerProvider";

export default function ResetPassword(props) {
    const [email, setEmail] = useState("");

    //for Enabled or Disabled inputs and buttons during async/await
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handledSentResetEmail } = FromPlayerProvider();

    const handleSubmitSentResetEmail = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();
        await handledSentResetEmail(email);
        setIsSubmitting(false);
        props.hideResetPassword();
    }

    return (
        <div className="reset-password-container wd-1">
            <form className="form-reset-password" onSubmit={(event) => handleSubmitSentResetEmail(event)}>
                <h2>Request reset password by email</h2>
                <div className="input-div">
                    <div className="input-inline">
                        <img src="./images/email.png" alt="email" />
                        <input
                            value={email}
                            type="email"
                            name="email"
                            disabled={isSubmitting}
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>
                <br />
                <div className="button-div">
                    <button type="submit"
                        id="send-reset-email-button"
                        disabled={!email || isSubmitting}
                    >Send a reset email</button>
                    <button disabled={isSubmitting} onClick={props.hideResetPassword} type="cancel">Cancel</button>
                </div>
                <br />
            </form>
        </div>
    )
}

