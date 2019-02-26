require('dotenv').config()

const express = require('express')
const validate = require('express-validation')
const Youch = require('youch')
const mongoose = require('mongoose')
const Sentry = require('@sentry/node')

const mongoConfig = require('./config/mongo')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(mongoConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./router'))
  }

  exception () {
    if (!this.isDev) {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (this.isDev) {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res.status(err.status || 500).json({
        error: 'Internal Server Error'
      })
    })
  }
}

module.exports = new App().express
