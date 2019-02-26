const Ad = require('../models/Ad')
const User = require('../models/User')

const Queue = require('../services/Queue')
const PurchaseMail = require('../jobs/PurchaseMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (!purchaseAd) {
      return res.status(400).send()
    }

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.status(204).send()
  }
}

module.exports = new PurchaseController()
