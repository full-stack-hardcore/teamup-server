exports.up = async function(knex) {
  await knex.schema.createTable('user', table => {
    table.increments('user_id')
    table.string('name')
    table.string('email')
    table.string('password')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTable('user')
}
