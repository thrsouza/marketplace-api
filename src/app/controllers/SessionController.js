const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !(await user.compareHash(password))) {
      return res.status(400).send()
    }

    return res.status(201).json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
