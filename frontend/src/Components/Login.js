import React, { useEffect, useState } from 'react'
import './Login.css'
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectAuthUser } from '../Redux/AuthUser'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currUser = useSelector(selectAuthUser);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/')
            } else {
                // setUser(null)
            }
        })
        return unsubscribe
        //! this is a comment to disbale the error for dependencies
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(currUser);

    }, [currUser])

    const handleSignIn = (e) => {
        e.preventDefault()
        console.log(email, password)
        auth.signInWithEmailAndPassword(email, password)
            .then(data =>
                // console.log(user.user._delegate)
                fetch('http://localhost:4444/login/' + email).then(res => res.json()).then(data => {
                    // console.log(data)
                    dispatch(setUser({ email: data.email, userName: data.userName, fullName: data.fullName }))
                })
                // dispatch(setUser({email:data.user._delegate.email, userName:data.user._delegate.displayName, fullName:}))
            )
            .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <img src="/Images/login.png" alt="login" />
            <div>
                <div className='login_card'>
                    <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="instagram logo" />
                    <form>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                        <button type="submit" className="login_button" onClick={handleSignIn}>Login In</button>
                    </form>
                </div>
                <div className="signup_section">Don't have an account? <Link to="/signup">Sign up</Link></div>
            </div>
        </div >
    )
}

export default Login