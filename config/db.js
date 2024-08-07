const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Promisify the connection
const promiseConnection = connection.promise();

// Handle connection errors
promiseConnection.connect()
  .then(() => {
    console.log('Connected to database as id ' + connection.threadId);
  })
  .catch(err => {
    console.error('Error connecting to database: ' + err.stack);
    process.exit(1); // Exit the application if unable to connect to the database
  });

module.exports = promiseConnection;
