const Purchase = require('../models/Purchase')

class ApproveController {
  async update (req, res) {
    const { id } = req.params
    const { ad } = await Purchase.findById(id).populate('ad')

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).send()
    }
    if (ad.purchasedBy) {
      return res.status(400).send()
    }

    ad.purchasedBy = id

    await ad.save()

    return res.status(200).json(ad)
  }
}

module.exports = new ApproveController()
