const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// Define post route for logging in
loginRouter.post('/', async (request, response) => {
  // Get username and password from request
  const { username, password } = request.body

  // Find the user from mongoose model
  const user = await User.findOne({ username })

  // Validate password through bcrypt
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // If username & password is incorrect, reject
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // Record logged in user
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // Generate token for such user
  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.SECRET)

  // Send token to browser
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter