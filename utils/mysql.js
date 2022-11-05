/* eslint-disable no-shadow */
const mysql = require("mysql2");

const dbConfig = {
    connectionLimit: 30, // default 10
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4",
};

const pool = mysql.createPool(dbConfig).promise();

/* eslint no-async-promise-executor: "off"  */

const connection = () =>
    new Promise(async (resolve, reject) => {
        try {
            const connection = await pool.getConnection();
            // console.log("MySQL pool connected: threadId " + connection.threadId);
            const query = (sql, binding) =>
                new Promise(async (resolve, reject) => {
                    try {
                        const [rows] = await connection.query(sql, binding);
                        resolve(rows);
                    } catch (err) {
                        reject(err);
                    }
                });
            const release = () => connection.release();
            resolve({
                query,
                release,
            });
        } catch (err) {
            reject(err);
        }
    });

const query = (sql, binding) =>
    new Promise(async (resolve, reject) => {
        try {
            const [rows] = await pool.query(sql, binding);
            resolve(rows);
        } catch (err) {
            reject(err);
        }
    });

module.exports = {
    pool,
    connection,
    query,
};
