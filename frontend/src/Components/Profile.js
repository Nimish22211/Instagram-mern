import React from 'react'
import './Profile.css'
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../Redux/AuthUser'

function Profile() {
    const currUser = useSelector(selectAuthUser)
    return (
        <div className="profile">
            <div className="profile_header">
                <img src="/Images/twitter profile-modified.png" alt="profile" className="profile_picture" />
                <div className="profile_info">
                    <div className="info_head">
                        <p className="profile_username">{currUser.userName}</p>
                        <button className="edit_profile">Edit Profile</button>
                        <span>Settings</span>
                    </div>
                    <div className="data_numbers">
                        <span>
                            <strong>
                                93
                            </strong>
                            <span> posts</span>
                        </span>
                        <span>
                            <strong>
                                206
                            </strong>
                            <span> followers</span>
                        </span>
                        <span>
                            <strong>
                                32
                            </strong>
                            <span> following</span>
                        </span>
                    </div>
                    <div className="fullName">
                        <p>{currUser.fullName}</p>
                    </div>
                    <div className="bio">
                        👉 Aspiring software developer 💻
                        <br />
                        👉 Interested in Web, AI & Blockchain 🤖
                        <br />
                        👉 Learning new skills 🤹
                        <br />
                        👉 YouTube channel (Nimish Bandha 7k+)
                        <br />
                        👉 Speedcuber
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile