import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className="login">
            <img src="/Images/login.png" alt="login" />
            <div>
                <div className='login_card'>
                    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="instagram logo" />
                    <form>
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <button className="login_button">Login In</button>
                    </form>
                </div>
                <div className="signup_section">Don't have an account? Sign up</div>
            </div>
        </div>
    )
}

export default Login