const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
  `CREATE TABLE IF NOT EXISTS
  users(
      id UUID PRIMARY KEY,
      title VARCHAR(10) NOT NULL,
      surname VARCHAR(30) NOT NULL,
      middle_name VARCHAR(30) NOT NULL,
      first_name VARCHAR(30) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      gender VARCHAR(20) NOT NULL,
      password VARCHAR(128) NOT NULL,
      address VARCHAR(128) NOT NULL,
      phone_number VARCHAR(30) NOT NULL UNIQUE,
      service_number VARCHAR(128) NOT NULL UNIQUE,
      date_of_birth DATE NOT NULL,
      city VARCHAR(50) NOT NULL,
      state VARCHAR(50) NOT NULL,
      zip VARCHAR(50) NOT NULL,
      rank VARCHAR(50) NOT NULL,
      branch_of_service VARCHAR(50) NOT NULL,
      corpDepartment VARCHAR(50) NOT NULL,
      date_of_enlistment DATE NOT NULL,
      date_of_commission DATE NOT NULL,
      date_of_disengagement DATE NOT NULL,
      occupation VARCHAR(50) NOT NULL,
      user_image VARCHAR(200) NOT NULL,
      created_date TIMESTAMP NOT NULL,
      modified_date TIMESTAMP NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});



module.exports = {
  createTables,
  dropTables,
  pool
};

require('make-runnable');