const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transporter = nodemailer.createTransport(mailConfig)

transporter.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({ partialsDir: [] }),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
  })
)

module.exports = transporter
