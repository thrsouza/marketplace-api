const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Marketplace" <no-reply@marketplace.com>',
      to: ad.author.email,
      subject: `Purchase Request: ${ad.title}`,
      template: 'purchase',
      context: { ad, user, content }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
