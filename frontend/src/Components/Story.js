import React, { useState } from 'react'
import './Story.css'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../Redux/AuthUser'

function Story() {
    const currUser = useSelector(selectAuthUser)
    const [followers, setFollowers] = useState(currUser.followers)
    console.log(currUser)
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
            <figure>
                <div className="add_icon_circle">
                    <AddIcon style={{ textAlign: 'center', width: '56px' }} />
                    <figcaption style={{ textAlign: 'center', width: '56px', fontSize: '14px' }}>Add</figcaption>
                </div>
            </figure>
            <div className="follow_for_story">
                Follow someone to view their story
            </div>
        </section>
    )
}

export default Story