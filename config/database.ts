import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      searchPath: [env.get('DB_SCHEMA')],
      connection: {
        host: env.get('DB_HOST'), // Host do banco de dados
        port: Number(env.get('DB_PORT')), // Porta do banco de dados
        user: env.get('DB_USER'), // Usuário do banco de dados
        password: env.get('DB_PASSWORD', ''), // Senha do banco de dados
        database: env.get('DB_NAME'), // Nome do banco de dados
      },
      migrations: {
        naturalSort: true, // Ordena as migrações automaticamente
        paths: ['database/migrations'], // Caminho das migrações
      },
    },
  },
})

export default dbConfig
