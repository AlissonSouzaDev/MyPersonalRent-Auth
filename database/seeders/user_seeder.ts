import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: env.get('US_NAME'),
      email: env.get('US_EMAIL'),
      password: env.get('US_PASSWORD'),
      role_id: 1,
    })
  }
}
