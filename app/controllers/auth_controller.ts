import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  // Método para autenticar um usuário
  public async login({ request, auth, response }: HttpContext) {
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

      await auth.use('web').login(user)

      // Retornar o token gerado
      return response.status(200).json({
        message: 'Login realizado com Sucesso.',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.fullName,
          role_id: user.role_id,
        },
      })
    } catch (error) {
      return response.status(500).json({
        message: 'An error occurred during login. Please try again later.',
        error: error.message || 'Internal Server Error',
      })
    }
  }
}
