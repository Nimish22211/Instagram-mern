import React, { useEffect, useState } from 'react'
import './Story.css'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../Redux/AuthUser'
import { Avatar } from '@mui/material';

function Story() {
    const currUser = useSelector(selectAuthUser)
    const [following, setFollowing] = useState([])
    useEffect(() => {
        setFollowing(currUser.following)
    }, [currUser, following])
    // console.log(currUser)
    return (
        <section className="section_story">
            {/* <figure>
                <img src="/Images/qazijpg.jpg" alt="qazi" />
                <figcaption>cleverqazi</figcaption>
            </figure>
            <figure>
                <img src="/Images/garyvee.jpg" alt="garyvee" />
                <figcaption>garyvee</figcaption>
            </figure>
            <figure>
                <img src="/Images/naz.jpg" alt="naz" />
                <figcaption>nazdumanskyy</figcaption>
            </figure>
            <figure>
                <img src="/Images/sonny.jpg" alt="sonny" />
                <figcaption>ssssangha</figcaption>
            </figure>
            <figure>
                <img src="/Images/mclaren.jpg" alt="mclaren" />
                <figcaption>mclaren</figcaption>
            </figure> */}
            {following.length < 0 ? <>
                <figure>
                    <div className="add_icon_circle">
                        <AddIcon style={{ textAlign: 'center', width: '56px' }} />
                        <figcaption style={{ textAlign: 'center', width: '56px', fontSize: '14px' }}>Add</figcaption>
                    </div>
                </figure>
                <div className="follow_for_story">
                    Follow someone to view their story
                </div>
            </>
                : <>
                    {currUser.following && currUser.following.map(user => {
                        return (
                            <figure key={user.userName}>
                                <Avatar src="/" alt={user.userName} className="story_avatar" />
                                <figcaption>{user.userName}</figcaption>
                            </figure>
                        )
                    })}
                </>}

        </section>
    )
}

export default Story