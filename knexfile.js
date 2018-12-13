module.exports = {

  development: {
      client: 'pg',
      connection: 'postgres://localhost/floerke_reviews'
  },

  production: {
      client: 'postgresql',
      connection: process.env.DATABASE_URL + '?ssl=true'
  }

};