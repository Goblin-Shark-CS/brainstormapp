//import pool
const pool = require('./Models/brainstormModels');
const { generate } = require("random-words");

const sqlFunctions = {};

//insert a room into the database
sqlFunctions.addRoom = async (roomname = null, password = null) => {
  const _id = generate({ exactly: 1, wordsPerString: 2, separator: "-" });
  const text = `
  INSERT INTO rooms (_id, roomname, password)
  VALUES ($1, $2, $3)
  RETURNING *;`;
  const values = [_id, roomname, password];
  let newRoom;
  await pool
    .query(text, values)
    .then((data) => {
      newRoom = data.rows[0];
      console.log('Added to rooms table:', newRoom);
    })
    .catch((err) => console.log('Error adding a room to the database:', err));

  return newRoom;
};

//insert users into the database
sqlFunctions.addUser = async () => {
  const text = `
    INSERT INTO users
    DEFAULT VALUES 
    RETURNING *;`;
  let newUser;
  await pool
    .query(text)
    .then((data) => {
      newUser = data.rows[0];
      console.log('Added to user table:', newUser);
    })
    .catch((err) => console.log('Error adding a user to the database:', err));
  return newUser;
};

// // addUser test:
// sqlFunctions.addUser(1).then((user) => console.log('RETURNED:', user));

//insert an entry(a user's message) into the database
sqlFunctions.addEntry = async (messageText, roomId, userId) => {
  const text = `
  INSERT INTO entries (text, room_id, user_id, votes)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

  const values = [messageText, roomId, userId, 0];
  let entry;
  await pool
    .query(text, values)
    .then((data) => {
      entry = data.rows[0];
      console.log('Added to entries table:', entry);
    })
    .catch((err) => console.log('Error adding an entry to the database:', err));
  return entry;
};

// // addEntry test
// sqlFunctions
//   .addEntry('Make a brainstorm app', 'greenelephant', 1)
//   .then((entry) => console.log('RETURNED:', entry));

//insert a comment into the database
sqlFunctions.addComment = async (entryId, userId, commentText) => {
  const text = `
  INSERT INTO comments (entry_id, user_id, text)
      VALUES ($1, $2, $3)
      RETURNING *;`;

  const values = [entryId, userId, commentText];
  let newComment;
  await pool
    .query(text, values)
    .then((data) => {
      newComment = data.rows[0];
      console.log('Added to comment table:', newComment);
    })
    .catch((err) =>
      console.log('Error adding a comment to the database:', err)
    );
  return newComment;
};

// // addComment test
// sqlFunctions
//   .addComment(3, 1, "let's think more on that")
//   .then((comment) => console.log('RETURNED:', comment));

//insert votes into the database
sqlFunctions.addVote = async (entryId, userId) => {
  const text = `
  INSERT INTO votes (entry_id, user_id)
      VALUES ($1, $2)
      RETURNING *`;

  const values = [entryId, userId];
  let newVote;
  await pool
    .query(text, values)
    .then((data) => {
      newVote = data.rows[0];
      console.log('Added to votes table:', newVote);
    })
    .catch((err) => console.log('Error adding a vote to the database:', err));

  return newVote;
};
// // addVote test
// sqlFunctions.addVote(3, 2).then((vote) => console.log('RETURNED:', vote));

// getRoom
// take in an _id paramter
// it should return all the data for that room
// if no _id is passed in, return an array of ALL rooms
sqlFunctions.getRoom = (_id) => {
  if (_id === undefined) {
    pool.query(
      `
      SELECT * FROM rooms
      `
    );
  }
  pool
    .query(
      `
      SELECT * FROM rooms WHERE _id=${_id}
      `
    )
    .then((data) => console.log('The data for the room:', data))
    .catch((err) => console.log('Error getting the data for the room:', err));
};

// getEntries
// take in a room_id parameter
// return an array of all the entries for that room
sqlFunctions.getEntries = (roomId) => {
  pool
    .query(
      `
    SELECT * FROM entries WHERE roomId = ${roomId}
    `
    )
    .then((data) =>
      console.log('The data for the entry table of the room:', data)
    )
    .catch((err) => console.log('Error getting data for the entry table', err));
};

// getComments
// take in an entry_id
// return array of all comments for that entry
sqlFunctions.getComments = (entryId) => {
  pool
    .query(
      `
    SELECT * FROM comments WHERE entryId= ${entryId}
    `
    )
    .then((data) => console.log('The data for the comments table:', data))
    .catch((err) => console.log('Error getting data for the comments', err));
};

// getVoteCount
// take in an entry_id
// return the number of votes for that entry
sqlFunctions.getVoteCount = (entryId) => {
  pool
    .query(
      `
    SELECT * FROM votes WHERE entryId=${entryId}
    `
    )
    .then((data) => console.log('The number of votes for the entry:', data))
    .catch((err) =>
      console.log('Error getting the number of votes for the entry', err)
    );
};

// delete vote
// update room name

// Other queries:
// read
// delete

module.exports = sqlFunctions;
