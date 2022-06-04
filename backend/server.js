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

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen('4444', () => {
    console.log('Server is running on port 4444');
})