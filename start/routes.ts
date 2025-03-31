/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    router.post('/login', [AuthController, 'login'])
  })
}).prefix('/api/v1/auth')
