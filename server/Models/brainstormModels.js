const { Pool } = require('pg');

const PG_URI =
  'postgres://skptzoyf:u3kpKLsWJoZVDq8HU6irjCOOzhNDzJUz@suleiman.db.elephantsql.com/skptzoyf';

const pool = new Pool({
  connectionString: PG_URI,
});

const createTables = async () => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
    }
  });

  // create a room table
  await pool.query(
    `
  CREATE TABLE IF NOT EXISTS rooms (
    _id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    roomname VARCHAR(255));`,
    (err, result) => {
      if (err) {
        console.error('Error creating the rooms table:', err);
      } else {
        console.log('Rooms table created successfully');
      }
    }
  );

  //create an entries table
  await pool.query(
    `
  CREATE TABLE IF NOT EXISTS entries (
    _id SERIAL PRIMARY KEY ,
    text VARCHAR(255) NOT NULL,
    room_id VARCHAR,
    votes BIGINT DEFAULT 0,
    user_id BIGINT,
    FOREIGN KEY(room_id) REFERENCES rooms (_id),
    FOREIGN KEY(user_id) REFERENCES users (_id));`,
    (err, result) => {
      if (err) {
        console.error('Error creating the entries table:', err);
      } else {
        console.log('Entries table created successfully');
      }
    }
  );

  //create comments table (have composite primary keys - entry id and user id)
  await pool.query(
    `
  CREATE TABLE IF NOT EXISTS comments (
    _id SERIAL PRIMARY KEY,
    entry_id BIGINT,
    user_id BIGINT,
    text VARCHAR(255),
    FOREIGN KEY(entry_id) REFERENCES entries (_id),
    FOREIGN KEY(user_id) REFERENCES users (_id));`,

    (err, result) => {
      if (err) {
        console.error('Error creating the comments table:', err);
      } else {
        console.log('Comments table created successfully');
      }
    }
  );

  //create votes table (have a composite primary keys - entry id and user id)
  await pool.query(
    `
  CREATE TABLE IF NOT EXISTS votes (
    entry_id BIGINT,
    user_id BIGINT,
    PRIMARY KEY(entry_id, user_id),
    FOREIGN KEY(entry_id) REFERENCES entries (_id),
    FOREIGN KEY(user_id) REFERENCES users (_id));`,

    (err, result) => {
      if (err) {
        console.error('Error creating the votes table:', err);
      } else {
        console.log('Votes table created successfully');
      }
    }
  );

  //create users table
  await pool.query(
    `
  CREATE TABLE IF NOT EXISTS users (
    _id SERIAL PRIMARY KEY);`,

    (err, result) => {
      if (err) {
        console.error('Error creating the users table:', err);
      } else {
        console.log('Users table created successfully');
      }
    }
  );
};

// createTables();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
