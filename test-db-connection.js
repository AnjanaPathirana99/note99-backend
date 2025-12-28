// Test script to verify MySQL connection
require('dotenv').config({ path: './app.env' });
const mysql = require('mysql2');

console.log('Testing MySQL connection...');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('User:', process.env.DB_USER);
console.log('Password:', process.env.DB_PASSWORD ? '***' : 'NOT SET');
console.log('Database:', process.env.DB_NAME);
console.log('');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Connection failed!');
        console.error('Error:', err.message);
        console.error('Error code:', err.code);
        
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n⚠️  Password is incorrect!');
            console.error('\nTo fix this:');
            console.error('1. Update DB_PASSWORD in app.env with your actual MySQL root password');
            console.error('2. Or reset MySQL root password using:');
            console.error('   ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'999*#8Aa\';');
            console.error('   FLUSH PRIVILEGES;');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('\n⚠️  Cannot connect to MySQL server!');
            console.error('Make sure MySQL service is running.');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('\n⚠️  Database does not exist!');
            console.error('Create it using: CREATE DATABASE notesdb;');
        }
        process.exit(1);
    } else {
        console.log('✅ Connection successful!');
        connection.query('SELECT DATABASE() as current_db', (err, results) => {
            if (err) {
                console.error('Error querying database:', err.message);
            } else {
                console.log('Connected to database:', results[0].current_db);
            }
            connection.end();
            process.exit(0);
        });
    }
});

