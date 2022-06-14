import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthUser, setUser } from '../Redux/AuthUser'
import { Avatar, Modal } from '@mui/material/';
import { useParams, Link } from 'react-router-dom';

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



function Profile() {
    const currUser = useSelector(selectAuthUser)
    const params = useParams();
    const [profile, setProfile] = useState([]);
    const [showFollowBtn, setShowFollowBtn] = useState(null);
    const [showFollowModal, setShowFollowModal] = useState(false);
    const dispatch = useDispatch();
    const [userFollowing, setUserFollowing] = useState(null);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    // let unFollowBtn = document.getElementsByClassName('followingBtn')[0];
    let follow_unfollow = document.getElementById('follow_unfollow')
    function changeToUnfollow() {
        follow_unfollow.innerHTML = 'Unfollow'
    }
    function changeToFollowing() {
        follow_unfollow.innerHTML = 'Following'
    }
    useEffect(() => {
        setShowFollowModal(false);
        setShowFollowingModal(false)
        if (currUser.userName !== '') {
            fetch('http://localhost:4444/getuser/' + params.username, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                let isFollowing;
                if (currUser.following.length > 0) {
                    isFollowing = currUser.following.find((item) => {
                        if (item.userName === data.userName) {
                            return item
                        } else {
                            return false
                        }
                    })
                }

                if (data.userName === currUser.userName) {
                    setUserFollowing(null)
                } else if (isFollowing) {
                    setUserFollowing(true)
                } else {
                    console.log('set userfollowing')
                    setUserFollowing(false)
                }

                if (!data.error) {
                    setProfile(data)
                    if (data.userName === currUser.userName) {
                        setShowFollowBtn(false)
                    } else if (currUser.userName === "") {
                        console.log('no user??')
                        setShowFollowBtn(null)
                    } else {
                        setShowFollowBtn(true)
                    }
                } else {
                    setProfile(null)
                }
            })
        }

    }, [params.username, currUser])

    useEffect(() => {
        // console.log('set')
        follow_unfollow = document.getElementById('follow_unfollow')
    }, [showFollowBtn])

    useEffect(() => {
        //! event listners arent removed when new user is loaded
        //remove all the event listeners added to follow_unfollow when new user is loaded
        if (follow_unfollow) {
            // console.log('event remove')
            follow_unfollow.removeEventListener('mouseover', changeToUnfollow)
            follow_unfollow.removeEventListener('mouseout', changeToFollowing)
        }
        if (userFollowing !== null) {
            console.log('event set')

            if (userFollowing === true && follow_unfollow && follow_unfollow.classList.contains('followingBtn')) {
                console.log('yes')
                follow_unfollow.addEventListener('mouseover', changeToUnfollow)
                follow_unfollow.addEventListener('mouseout', changeToFollowing)
            } else if (userFollowing === false && follow_unfollow && follow_unfollow.classList.contains('followBtn')) {
                console.log('no')
                follow_unfollow.removeEventListener('mouseover', changeToUnfollow)
                follow_unfollow.removeEventListener('mouseout', changeToFollowing)
            }
            // eslint - disable - next - line
        }
        return () => {
            console.log('unmount')
            if (showFollowBtn) {
                follow_unfollow.removeEventListener('mouseover', changeToUnfollow)
                follow_unfollow.removeEventListener('mouseout', changeToFollowing)
            }
        }
    }, [userFollowing, params.username, showFollowBtn])

    const follow = () => {
        // if (follow_unfollow.classList.contains('followBtn')) {
        // }
        follow_unfollow.classList.remove('followBtn')
        follow_unfollow.classList.add('followingBtn')
        fetch('http://localhost:4444/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userName: currUser.userName,
                userToFollow: profile.userName
            })
        }).then(res => res.json()).then(data => {
            dispatch(setUser({ userName: data.userName, email: data.email, fullName: data.fullName, bio: data.bio, posts: data.posts, followers: data.followers, following: data.following }))
        })

    }

    const unFollow = () => {
        // if (follow_unfollow.classList.contains('followingBtn')) {

        // }
        follow_unfollow.classList.remove('followingBtn')
        follow_unfollow.classList.add('followBtn');
        follow_unfollow.removeEventListener('mouseover', changeToUnfollow)
        follow_unfollow.removeEventListener('mouseout', changeToFollowing)
        fetch('http://localhost:4444/unfollow', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userName: currUser.userName,
                userToUnFollow: profile.userName
            })
        }).then(res => res.json()).then(data => {
            dispatch(setUser({ userName: data.userName, email: data.email, fullName: data.fullName, bio: data.bio, posts: data.posts, followers: data.followers, following: data.following }))
        })

    }


    return (
        <div className="profile">
            {profile !== null ? (
                <>
                    <div className="profile_header">
                        {/* <img src="/Images/twitter profile-modified.png" alt="profile" className="profile_picture" /> */}
                        <Avatar alt={profile?.userName} src="/" id="profile_picture" />
                        <div className="profile_info">
                            <div className="info_head">
                                <p className="profile_username">{profile?.userName}</p>
                                {showFollowBtn === false ? (
                                    <>
                                        <button className="edit_profile">Edit Profile</button>
                                        <span>Settings</span>
                                    </>
                                ) : showFollowBtn == null ? (
                                    <div></div>
                                ) : <button id="follow_unfollow" className={userFollowing === false ? 'followBtn' : 'followingBtn'} onClick={userFollowing === false ? follow : unFollow}>{userFollowing === true ? 'Following' : userFollowing === false ? 'Follow' : 'null'}</button>}

                            </div>
                            <div className="data_numbers">
                                <span>
                                    <strong>
                                        {profile?.posts?.length}
                                    </strong>
                                    <span> posts</span>
                                </span>
                                {/* <Button >Open modal</Button> */}
                                <Modal
                                    open={showFollowModal}
                                    onClose={() => setShowFollowModal(false)}
                                >
                                    <div style={style}>
                                        <div className="modal_title">
                                            <h3>Followers</h3>
                                        </div>
                                        <div className="modal_list">
                                            {profile?.followers?.map((follower, index) => {
                                                return (
                                                    <Link to={`/${follower.userName}/posts`} key={index}>
                                                        <div  >
                                                            <h3>{follower.userName}</h3>
                                                            {/* <p>{follower.fullName}</p> */}
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Modal>
                                <span onClick={() => setShowFollowModal(true)}>
                                    <strong>
                                        {profile?.followers?.length}
                                    </strong>
                                    <span> followers</span>
                                </span>
                                <Modal
                                    open={showFollowingModal}
                                    onClose={() => setShowFollowingModal(false)}
                                >
                                    <div style={style}>
                                        <div className="modal_title">
                                            <h3>Following</h3>
                                        </div>
                                        <div className="modal_list">
                                            {profile?.following?.map((following, index) => {
                                                return (
                                                    <Link to={`/${following.userName}/posts`} key={index}>
                                                        <div>
                                                            <h3>{following.userName}</h3>
                                                            {/* <p>{following.fullName}</p> */}
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Modal>
                                <span onClick={() => setShowFollowingModal(true)}>
                                    <strong>
                                        {profile?.following?.length}
                                    </strong>
                                    <span> following</span>
                                </span>
                            </div>
                            <div className="fullName">
                                <p>{profile?.fullName}</p>
                            </div>
                            <div className="bio">
                                {profile?.bio}
                            </div>
                        </div>
                    </div>
                    <section className="profile_posts">
                        <div className="profile_posts_header">
                            <Link to={"/" + params.username + "/posts"}> <span >Posts</span></Link>
                            <Link to={"/" + params.username + "/reels"}> <span >Reels</span></Link>
                            <Link to={"/" + params.username + "/saved"}> <span >Saved</span></Link>
                            <Link to={"/" + params.username + "/tagged"}> <span >Tagged</span></Link>
                        </div>
                        <div className="profile_posts_body">
                            {params.profile === "posts" ? (
                                <div>Posts</div>
                            ) : params.profile === "reels" ? (
                                <div>Reels</div>
                            ) : params.profile === "saved" ? (
                                <div>Saved</div>
                            ) : <div>Tagged</div>}
                        </div>
                    </section></>
            ) : 'No user found'}
        </div>
    )
}

export default Profile