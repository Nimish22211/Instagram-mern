import React, { useEffect, useState } from 'react'
import './Signup.css'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectAuthUser } from '../Redux/AuthUser'

function Signup() {

    // const auth = getAuth(app)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [loggedUser, setLoggedUser] = useState(null);
    const dispatch = useDispatch();
    const currUser = useSelector(selectAuthUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user);
                setLoggedUser(user)
                dispatch(setUser({ email: user.email, userName: user.displayName }))
            } else {
                setUser(null)
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        console.log(currUser);

    }, [currUser])
    const handleSignUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                return user.user.updateProfile({
                    displayName: userName,
                })
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="signup">
            <div className="signup_card">

                <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="instagram logo" />

                <h3>Sign up to see photos and videos from your friends. </h3>
                <form className="signup_form">
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder="Full Name" />
                    <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="Username" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />

                    <button type="submit" className="signup_button" onClick={handleSignUp}>Sign Up</button>
                </form>
            </div>
            <div className="login_section">
                Have an account? Log in
            </div>
        </div>
    )
}

export default Signup