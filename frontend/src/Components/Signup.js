import React, { useEffect, useState } from 'react'
import './Signup.css'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectAuthUser } from '../Redux/AuthUser'
import { useNavigate } from 'react-router-dom'

function Signup() {

    // const auth = getAuth(app)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const dispatch = useDispatch();
    const currUser = useSelector(selectAuthUser);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/')
            } else {
                setUser(null)
            }
        })
        return unsubscribe
        //! this is a comment to disbale the error for dependencies
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(currUser);

    }, [currUser])

    const handleSignUp = (e) => {
        e.preventDefault();
        if (userName === "" || fullName === "") {
            alert('fill all fields')
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    return user.user.updateProfile({
                        displayName: userName
                    })
                }).then(() => {

                    fetch('http://localhost:4444/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            userName: userName,
                            fullName
                        })
                    }).then(res => res.json()).then(data => {
                        dispatch(setUser({ email: data.email, userName: data.userName, fullName: data.fullName }))
                    })
                })
                .catch(err => alert(err.message))
        }

    }
    const handleChange = (elem, e) => {
        if (elem === 'fullName') {
            setFullName(e.target.value)
        } else if (elem === 'email') {
            setEmail(e.target.value)
        } else if (elem === 'password') {
            setPassword(e.target.value)
        } else if (elem === 'userName') {
            setUserName(e.target.value)
        }
    }

    return (
        <div className="signup">
            <div className="signup_card">

                <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="instagram logo" />

                <h3>Sign up to see photos and videos from your friends. </h3>
                <form className="signup_form">
                    <input onChange={(e) => handleChange('fullName', e)} value={fullName} type="text" placeholder="Full Name" />
                    <input onChange={(e) => handleChange('userName', e)} value={userName} type="text" placeholder="Username" />
                    <input onChange={(e) => handleChange('email', e)} value={email} type="email" placeholder="Email" />
                    <input onChange={(e) => handleChange('password', e)} value={password} type="password" placeholder="Password" />

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