module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'secret',
      database : 'gnt_db',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/api/db/migrations',
    },
    seeds: {
      directory: __dirname + '/api/db/seeds'
    }
  }
}