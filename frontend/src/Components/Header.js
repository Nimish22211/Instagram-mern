import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../Redux/AuthUser'


function Header() {
    const [homeActive, setHomeActive] = useState(true);
    const [inboxActive, setInboxActive] = useState(false);
    const [postActive, setPostActive] = useState(false);
    const [exploreActive, setExploreActive] = useState(false);
    const [profileActive, setProfileActive] = useState(false);
    const currUser = useSelector(selectAuthUser)
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                navigate('/login')
            } else {
                // setUser(null)
            }
        })
        return unsubscribe
        //! this is a comment to disbale the error for dependencies
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        var ignoreClickOnMeElement = document.getElementById('profile_icon');

        const closeProfile = document.addEventListener('click', function (event) {
            var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);

            if (!isClickInsideElement && profileActive === true) {
                //Do something click is outside specified elemen
                setProfileActive(false);
            }
        });
        return document.removeEventListener('click', closeProfile);
    }, [profileActive])



    const signout = () => {
        signOut(auth)
    }

    return (
        <header>
            <div className="header_container">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta logo" />
                <form className="header_form">
                    <i>
                        <SearchIcon />
                    </i>
                    <input type="text" placeholder="Search" />
                </form>
                <nav>
                    <div>
                        <HomeIcon className="icon" />
                    </div>
                    <div>
                        <MessageOutlinedIcon className="icon" />
                    </div>
                    <div>
                        <AddBoxOutlinedIcon className="icon" />
                    </div>
                    <div>
                        <ExploreOutlinedIcon className="icon" />
                    </div>
                    <div>
                        <FavoriteBorderOutlinedIcon className="icon" />
                    </div>
                    <div className="profile_container"  >
                        <Avatar alt={currUser.userName} src="/" id="profile_icon" className="icon avatar" onClick={() => setProfileActive(prev => !prev)} />
                        {profileActive && (
                            <div className="profile_dropdown" id="profile_box">
                                <div>
                                    <Link to={currUser.userName !== "" ? '/' + currUser.userName : '/'}>
                                        <div className="d-flex">
                                            <AccountCircleOutlinedIcon />
                                            <span> Profile</span>
                                        </div>
                                    </Link>
                                    <div className="d-flex">
                                        <BookmarkBorderOutlinedIcon />
                                        <span>Saved</span>
                                    </div>
                                    <div className="d-flex">
                                        <SettingsOutlinedIcon />
                                        <span>Settings</span>
                                    </div>
                                    <div className="d-flex">
                                        <LoopOutlinedIcon />
                                        <span>Switch Accounts</span>
                                    </div>
                                </div>
                                <div className="profile_logout" onClick={signout}>
                                    <p style={{ fontSize: '15px' }}>Log out</p>
                                </div>
                            </div>)}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header