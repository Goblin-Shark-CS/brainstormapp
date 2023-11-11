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

//create a room table
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

//create an entries table
pool.query(
  `
  CREATE TABLE IF NOT EXIST entries (
    _id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    room_id BIGINT,
    votes BIGINT DEFAULT 0,
    user_id BIGINT,
    FOREIGN KEY(room_id) REFERENCES rooms (_id),
    FOREIGN KEY(user_id) REFERENCES users (_id))`,
  (err, result) => {
    if (err) {
      console.error('Error creating the entries table');
    } else {
      console.log('Entries table created successfully');
    }
  }
);



//create comments table (have composite primary keys - entry id and user id)
pool.query(
  `
  CREATE TABLE IF NOT EXIST comments (
    entry_id BIGINT,
    user_id BIGINT,
    text VARCHAR(255),
    PRIMARY KEY(entry_id, user_id),
    FOREIGN KEY(entry_id) REFERENCES entries (_id),
    FOREIGN KEY(user_id) REFERENCES users (_id))`,
    
    (err, result) => {
      if (err) {
        console.error('Error creating the comments table');
      } else {
        console.log('Comments table created successfully');
      }
    }
  );


//create votes table (have a composite primary keys - entry id and user id)
pool.query(
  `
  CREATE TABLE IF NOT EXIST votes (
    entry_id BIGINT,
    user_id BIGINT,
    PRIMARY KEY(entry_id, user_id),
    FOREIGN KEY(entry_id) REFERENCES entries (_id),
    FOREIGN KEY(user_id) REFERENCES users (_id))`,

    (err, result) => {
      if (err) {
        console.error('Error creating the votes table');
      } else {
        console.log('Votes table created successfully');
      }
    }
  );

//create users table 
pool.query(
  `
  CREATE TABLE IF NOT EXIST users (
    _id BIGINT PRIMARY KEY)`,

    (err, result) => {
      if (err) {
        console.error('Error creating the users table');
      } else {
        console.log('Users table created successfully');
      }
    }
  );


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
