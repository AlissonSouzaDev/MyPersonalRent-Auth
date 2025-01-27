import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments() // O Adonis cria automaticamente o campo 'id'
      table.string('name').notNullable().unique() // 'Admin' ou 'Convidado'
      table.timestamps() // Cria created_at e updated_at
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
