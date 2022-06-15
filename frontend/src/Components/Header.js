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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Modal } from '@mui/material/';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectAuthUser } from '../Redux/AuthUser'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    // border: '2px solid #000',
    outline: 'none',
    boxShadow: 24,
    borderRadius: 6,
};

function Header() {
    const [homeActive, setHomeActive] = useState(true);
    const [inboxActive, setInboxActive] = useState(false);
    const [postActive, setPostActive] = useState(false);
    const [exploreActive, setExploreActive] = useState(false);
    const [profileActive, setProfileActive] = useState(false);
    const currUser = useSelector(selectAuthUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [searchModal, setSearchModal] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const params = useParams();

    useEffect(() => {
        setSearchModal(false)
        setInput('')
    }, [params.username])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                navigate('/login')
            } else {
                dispatch(setUser({ email: user.email, userName: user.displayName, fullName: '', followers: '', following: '', posts: '', bio: '' }))
                fetch('http://localhost:4444/login/' + user.email)
                    .then(res => res.json())
                    .then(data => {
                        let followers = data.followers
                        let following = data.following
                        let posts = data.posts
                        let bio = data.bio
                        if (data.followers === undefined) {
                            data.followers = []
                        } else if (data.following === undefined) {
                            data.following = []
                        } else if (data.posts === undefined) {
                            data.posts = []
                        } else if (data.bio === undefined) {
                            data.bio = ''
                        }
                        dispatch(setUser({ email: data.email, userName: data.userName, fullName: data.fullName, followers: followers, following: following, posts: posts, bio: bio }))
                    })
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

    const handleSearch = (e) => {
        e.preventDefault();
        fetch('http://localhost:4444/getusers/search?q=' + input)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSearchResults(data)
            })
        setSearchModal(true)
        console.log(input)
    }

    return (
        <header>
            <div className="header_container">
                <Link to="/">
                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta logo" />
                </Link>
                <form className="header_form">
                    <i>
                        <SearchIcon />
                    </i>
                    <input type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" style={{ display: 'none' }} onClick={handleSearch}></button>
                </form>
                <Modal
                    open={searchModal}
                    onClose={() => setSearchModal(false)}
                >
                    <div style={style}>
                        <div className="modal_title">
                            <h3>Search Results</h3>
                        </div>
                        <div className="modal_list">
                            {searchResults.map((user, index) => (
                                <Link to={`/${user.userName}/posts`} key={index}>

                                    <div>
                                        <h3>{user.userName}</h3>
                                        <p>{user.fullName}</p>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    </div>

                </Modal>
                <nav>
                    <Link to="/">
                        <div>
                            <HomeIcon className="icon" />
                        </div>
                    </Link>
                    <div>
                        <MessageOutlinedIcon className="icon" />
                    </div>
                    <div>
                        <AddBoxOutlinedIcon className="icon" onClick={() => setPostModal(true)} />
                        <Modal
                            open={postModal}
                            onClose={() => setPostModal(false)}
                        >
                            <div style={style}>
                                <div className="modal_title">
                                    <h3>Create New Posts</h3>
                                </div>
                            </div>
                        </Modal>
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
                                    <Link to={currUser.userName !== "" ? '/' + currUser.userName + '/posts' : '/'}>
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