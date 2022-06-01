import React from 'react'
import './Signup.css'

function Signup() {
    return (
        <div className="signup">
            <div className="signup_card">

                <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="instagram logo" />

                <h3>Sign up to see photos and videos from your friends. </h3>
                <form className="signup_form">
                    <input type="text" placeholder="Full Name" />
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />

                    <button className="signup_button">Sign Up</button>
                </form>
            </div>
            <div className="login_section">
                Have an account? Log in
            </div>
        </div>
    )
}

export default Signup