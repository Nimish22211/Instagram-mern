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
    const [image, setImage] = useState('');
    const [showImage, setShowImage] = useState(false);

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

    const triggerAddFile = () => {
        document.getElementById('getFile').click()
        setShowImage(true)
    }

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            let img = document.getElementById('chosenImg')
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                img.style.display = "block"
                img.src = reader.result
            }
            document.getElementById('file_info').innerHTML = e.target.files[0].name
        } else {
            document.getElementById('file_info').innerHTML = 'No file chosen'
            setShowImage(false)
        }
    }


    const handlePostModal = (e) => {
        setPostModal(true)
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
                        <AddBoxOutlinedIcon className="icon" onClick={handlePostModal} />
                        <Modal
                            open={postModal}
                            onClose={() => {
                                setPostModal(false)
                                setShowImage(false)
                            }}
                        >
                            <div style={style}>
                                <div className="modal_title">
                                    <h3>Create New Posts</h3>
                                </div>
                                <div className="post_modal_body">

                                    {showImage === true ? <>
                                    </> : (
                                        <>
                                            <svg aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>

                                        </>
                                    )}
                                    <img id="chosenImg" alt="post" style={{ display: 'none' }} className="post_preview" />
                                    <input type="file" id="getFile" onChange={handleFileChange} hidden="hidden" />
                                    {/* <button onClick={addFile}>Select from your computer </button> */}
                                    <span id="file_info"></span>
                                    <button type="button" id="triggerFile" onClick={triggerAddFile}>Select from your computer</button>

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