const { Router } = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/token',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.post(
  '/api/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

routes.use('/api', authMiddleware)

/**
 * Ads
 */
routes.get('/api/ads', handle(controllers.AdController.index))
routes.get('/api/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/api/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put('/api/ads/:id', handle(controllers.AdController.update))
routes.delete('/api/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */
routes.post(
  '/api/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
routes.put('/api/purchases/:id', handle(controllers.ApproveController.update))

module.exports = routes
