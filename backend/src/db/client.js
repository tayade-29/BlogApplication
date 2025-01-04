const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.DATABASE_URL
});

module.exports = client;