const mysql = require('mysql2');

// Validate environment variables
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('Missing required database environment variables');
    console.error('DB_HOST:', process.env.DB_HOST);
    console.error('DB_USER:', process.env.DB_USER);
    console.error('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NOT SET');
    console.error('DB_NAME:', process.env.DB_NAME);
}

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection error:', err.message);
        console.error('Error code:', err.code);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n⚠️  MySQL Authentication Failed!');
            console.error('Please verify:');
            console.error('  1. MySQL username is correct');
            console.error('  2. MySQL password is correct');
            console.error('  3. MySQL user has proper permissions');
            console.error('\nTo reset MySQL root password, run:');
            console.error('  ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'your_new_password\';');
        }
    } else {
        console.log('✅ Database connected successfully!');
        connection.release();
    }
});

module.exports = pool.promise();