const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).send()
    }

    const user = await User.create(req.body)
    return res.status(201).json(user)
  }
}

module.exports = new UserController()
