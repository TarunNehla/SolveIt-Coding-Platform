const UserRouter = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

UserRouter.post('/', async (req,res) => {
    const {name, email, password} = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);

    const user = new User({
        name,
        email,
        passwordHash
    })

    const savedUser = await user.save();

    res.status(201).json(savedUser);
})

UserRouter.get('/', async (req,res) => {
    const allUsers = await User.find({})
    // const allUsers = await User.find({}).populate('blogs',{title: 1, author: 1, url:1, likes: 1});
    res.status(200).json(allUsers);
})

module.exports = UserRouter;