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
    useEffect(() => {
        fetch('http://localhost:4444/getuser/' + params.username, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
            let isFollowing = currUser.following.find((item) => {
                if (item.userName === data.userName) {
                    return true
                } else {
                    return false
                }
            })
            if (isFollowing) {
                setUserFollowing(true)
            } else {
                setUserFollowing(false)
            }
            console.log(userFollowing, "userFollowing")
            if (!data.error) {
                setProfile(data)
                console.log(data.userName, ' <<< data', currUser.userName, ' <<< redux')
                if (data.userName === currUser.userName) {
                    setShowFollowBtn(false)
                    console.log('same user')
                } else if (currUser.userName === "") {
                    setShowFollowBtn(null)
                    console.log('no user')
                } else {
                    setShowFollowBtn(true)
                    console.log('different user')
                }
            } else {
                setProfile(null)
                console.log('no user found')
                console.log(profile)
            }
        })
        // .catch(err => console.log(err))
    }, [params.username, currUser,])

    const follow = () => {
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
            console.log(data)
            dispatch(setUser({ userName: data.userName, email: data.email, fullName: data.fullName, bio: data.bio, posts: data.posts, followers: data.followers, following: data.following }))
            // if (!data.error) {
            //     setShowFollowBtn(false)
            // } else {
            //     console.log('error')
            // }
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
                                ) : <button className="followBtn" onClick={follow}>{userFollowing === true ? 'Following' : userFollowing === false ? 'Follow' : ''}</button>}

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
                                            {profile?.followers?.map((follower) => {
                                                return (
                                                    <div key={follower._id}>
                                                        {follower.userName}
                                                    </div>
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
                                            {profile?.following?.map((following) => {
                                                return (
                                                    <div key={following._id}>
                                                        {following.userName}
                                                    </div>
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