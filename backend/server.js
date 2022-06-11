const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    'Access-Control-Allow-Methods': '*'
}));

app.use(express.json())

mongoose.connect('mongodb+srv://nimish:nimish@cluster0.lbta6.mongodb.net/instagram?retryWrites=true&w=majority', console.log('connected'))


const userSchema = new mongoose.Schema({
    userName: String,
    fullName: String,
    email: String,
    followers: Array,
    following: Array,
    posts: Array
})

const users = mongoose.model('users', userSchema);

const createUser = async (userName, fullName, email) => {
    const userExists = await users.findOne({ email })
    if (userExists) {
        console.log('user already exists')
        return userExists
    } else {
        const newUser = await users.create({
            userName,
            fullName,
            email,
            followers: [],
            following: [],
            posts: []
        })
        console.log('new user')
        return newUser
    }
}

app.post('/signup', (req, res) => {
    const { userName, fullName, email } = req.body;
    createUser(userName, fullName, email).then(data => res.send(data))
})

app.get('/login/:email', (req, res) => {
    const { email } = req.params;
    getUser(email).then(data => res.send(data))
})

const getUser = async (email) => {
    const user = await users.findOne({ email })
    return user
}

app.get('/getuser/:username', (req, res) => {
    const { username } = req.params;
    getUserByUsername(username).then(data => res.send(data))
})

const getUserByUsername = async (username) => {
    const user = await users.findOne({ userName: username })
    console.log(user)
    let error = { 'error': 'user not found' }
    if (user) {
        return user
    } else {
        return error
    }
}

app.post('/follow', (req, res) => {
    const { userName, userToFollow } = req.body;
    followUser(userName, userToFollow).then(data => res.send(data))
})

const followUser = async (username, followThisUser) => {
    const user = await users.findOne({ userName: username })
    const userToFollow = await users.findOne({ userName: followThisUser })
    userToFollow.followers.push({ userName: username })
    user.following.push({ userName: followThisUser })
    userToFollow.save()
    user.save()
    return user
}

app.patch('/unfollow', (req, res) => {
    const { userName, userToUnFollow } = req.body;
    unFollowUser(userName, userToUnFollow).then(data => res.send(data))
})

const unFollowUser = async (username, unFollowThisUser) => {
    const user = await users.findOne({ userName: username })
    const userToUnFollow = await users.findOne({ userName: unFollowThisUser })
    userToUnFollow.followers = await userToUnFollow.followers.filter(follower => follower.userName !== username)
    user.following = await user.following.filter(following => following.userName !== unFollowThisUser)
    userToUnFollow.save()
    user.save()
    return user
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen('4444', () => {
    console.log('Server is running on port 4444');
})