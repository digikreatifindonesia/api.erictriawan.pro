const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME,        // Nama database
    process.env.DB_USER,        // Username database
    process.env.DB_PASSWORD || '', // Password database, jika ada
    {
        host: process.env.DB_HOST,  // Host database (misalnya localhost atau alamat server)
        port: process.env.DB_PORT,  // Port database (biasanya 3306 untuk MySQL)
        dialect: 'mysql',           // Dialek untuk MySQL
        logging: false,             // Menonaktifkan log SQL query
        dialectOptions: {
            connectTimeout: 10000,  // Timeout koneksi dalam milidetik (10 detik)
        },
        pool: {
            max: 5,                  // Jumlah koneksi maksimal dalam pool
            min: 0,                  // Jumlah koneksi minimal dalam pool
            acquire: 30000,          // Waktu maksimal untuk mendapatkan koneksi
            idle: 10000,             // Waktu idle maksimal untuk koneksi
        },
    },);

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;
