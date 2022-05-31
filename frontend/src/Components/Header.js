import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Header() {
    return (
        <header>
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta logo" />
            <form className="header_form">
                <SearchIcon />
                <input type="text" placeholder="Search" />
            </form>
            <nav>
                <HomeIcon className="icon" />
                <MessageOutlinedIcon className="icon" />
                <AddBoxOutlinedIcon className="icon" />
                <ExploreOutlinedIcon className="icon" />
                <FavoriteBorderOutlinedIcon className="icon" />
                <AccountCircleOutlinedIcon className="icon" />
            </nav>
        </header>
    )
}

export default Header