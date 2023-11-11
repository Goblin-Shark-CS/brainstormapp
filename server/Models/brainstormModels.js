const { Pool } = require('pg');

const PG_URI =
  'postgres://skptzoyf:u3kpKLsWJoZVDq8HU6irjCOOzhNDzJUz@suleiman.db.elephantsql.com/skptzoyf';

const pool = new Pool({
  connectionString: PG_URI,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

pool.query(
  `
  CREATE TABLE IF NOT EXISTS rooms (
    _id BIGINT PRIMARY KEY,
    password VARCHAR(255),
    roomname VARCHAR(255))`,
  (err, result) => {
    if (err) {
      console.error('Error creating the rooms table');
    } else {
      console.log('Rooms table created successfully');
    }
  }
);

pool.query(
  `
  CREATE TABLE IF NOT EXIST entries (
    _id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    room_id BIGINT FOREIGN KEY,
    votes BIGINT DEFAULT 0
    user_id BIGINT FOREIGN KEY))`,
  (err, result) => {
    if (err) {
      console.error('Error creating the entries table');
    } else {
      console.log('Entries table created successfully');
    }
  }
);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
