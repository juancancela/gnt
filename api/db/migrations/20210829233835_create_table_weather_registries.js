exports.up = (knex, Promise) => {
    return knex.schema.createTable('weather', (table) => {
      table.primary(['applicable_date', 'woeid']);
      table.integer('woeid').notNullable();
      table.string('applicable_date').notNullable();
      table.float('the_temp').notNullable();
      table.float('min_temp').notNullable();
      table.float('max_temp').notNullable();
      table.float('humidity').notNullable();
      table.string('weather_state_abbr').notNullable();
    })
  }
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('weather');
  }