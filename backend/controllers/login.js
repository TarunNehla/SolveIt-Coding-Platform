const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })

  console.log('password:', password);
  console.log('user:', user);
  console.log('user.passwordHash:', user ? user.passwordHash : 'user not found');


  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email : user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET)

  response
    .status(200)
    .send({ token, email: user.email, name: user.name })
})

module.exports = loginRouter