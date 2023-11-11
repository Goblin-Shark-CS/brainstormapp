//import pool
const pool = require('./Models/brainstormModels');

const sqlFunctions = {};

//insert a room into the database
sqlFunctions.addRoom = (id, roomname = null, password = null) => {
  const values = [id, roomname, password];
  pool
    .query(
      `
    INSERT INTO rooms (_id, roomname, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
      values
    )
    .then((data) => console.log('Added to rooms table:', data))
    .catch((err) => console.log('Error adding a room to the database:', err));
};

//insert an entry(it is user's message) into the database
sqlFunctions.addEntry = (id, messageText, roomId, votes, userId) => {
  const text = `
  INSERT INTO entries (_id, text, room_id, votes, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

  const values = [id, messageText, roomId, votes, userId];
  pool
    .query(text, values)
    .then((data) => console.log('Added to entries table:', data))
    .catch((err) => console.log('Error adding an entry to the database:', err));
};
// sqlFunctions.addEntry(1, 'where do we go for dinner today', 1, 3, 1);
// console.log('FINISHED');

//insert a comment into the database
sqlFunctions.addComment = (entryId, userId, commentText) => {
  const text = `
  INSERT INTO comments (entry_id, user_id, text)
      VALUES ($1, $2, $3)
      RETURNING *`;

  const values = [entryId, userId, commentText];
  pool
    .query(text, values)
    .then((data) => console.log('Added to comment table:', data))
    .catch((err) =>
      console.log('Error adding a comment to the database:', err)
    );
};
// sqlFunctions.addComment(1, 1, 'I agree!');
// console.log('FINISHED');

//insert votes into the database
sqlFunctions.addVotes = (entryId, userId) => {
  const text = `
  INSERT INTO votes (entry_id, user_id)
      VALUES ($1, $2)
      RETURNING *`;

  const values = [entryId, userId];
  pool
    .query(text, values)
    .then((data) => console.log('Added to votes table:', data))
    .catch((err) => console.log('Error adding a vote to the database:', err));
};
// sqlFunctions.addVotes(1, 1);
// console.log('FINISHED');

//insert users into the database
sqlFunctions.addUser = (userId) => {
  const text = `
  INSERT INTO users (_id)
      VALUES ($1)
      RETURNING *`;

  const values = [userId];
  pool
    .query(text, values)
    .then((data) => console.log('Added to user table:', data))
    .catch((err) => console.log('Error adding a user to the database:', err));
};
// sqlFunctions.addUser(1);
// console.log('FINISHED');

// getRoom
// take in an id paramter
// it should return all the data for that room
// if no id is passed in, return an array of ALL rooms 
sqlFunctions.addRoom = (id, roomname = null, password = null) => {
  pool.
    query (
      
    )

}

// getEntries 
// take in a room_id parameter
// return an array of all the entries for that room



// Other queries:
// read
// delete

module.exports = sqlFunctions;
