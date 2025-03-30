import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  // Método para autenticar um usuário
  async login({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Verificar se o usuário existe
      const user = await User.findBy('email', email)

      if (!user) {
        return response.unauthorized({ message: 'E-mail Inválido' })
      }

      // Verificar se a senha está correta
      const passwordVerified = await hash.verify(user.password, password)
      if (!passwordVerified) {
        return response.unauthorized({ message: 'Senha Inválida' })
      }

      if (user.is_disabled) {
        return response.unauthorized({
          message: 'Usuário desabilitado. Por favor, contate um administrador.',
        })
      }

      await auth.use('web').login(user)

      // Retornar o token gerado
      return response.ok({
        message: 'Login realizado com Sucesso.',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.fullName,
          role_id: user.role_id,
        },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'An error occurred during login. Please try again later.',
        error: error.message || 'Internal Server Error',
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.json({ message: 'Logout successful' })
  }
}
