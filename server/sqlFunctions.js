//import pool
const pool = require('./Models/brainstormModels');
const { generate } = require('random-words');

const sqlFunctions = {};

//insert a room into the database
sqlFunctions.addRoom = async (roomname = null, password = null) => {
  const text = `
  INSERT INTO rooms (_id, roomname, password)
  VALUES ($1, $2, $3)
  ON CONFLICT (_id) DO NOTHING
  RETURNING *;`;
  let newRoom;
  let attempt = 0;

  while (attempt < 5 && !newRoom) {
    const _id = generate({ exactly: 1, wordsPerString: 2, separator: '-' });
    const values = [..._id, roomname, password];

    await pool
      .query(text, values)
      .then((data) => {
        if (data.rows.length > 0) {
          newRoom = data.rows[0];
          console.log('Added to rooms table:', newRoom);
        }
      })
      .catch((err) => console.log('Error adding a room to the database:', err));

    attempt++;
  }

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
// sqlFunctions.addEntry('Sleep in', 'bluebat', 2);
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
sqlFunctions.getRoom = async (_id) => {
  let room;
  if (_id === undefined) {
    await pool
      .query(
        `
      SELECT * FROM rooms;
      `
      )
      .then((data) => {
        room = data.rows;
        console.log('The data for the rooms:', room);
      });
  } else {
    await pool
      .query(
        `
      SELECT * FROM rooms WHERE _id='${_id}'
      `
      )
      .then((data) => {
        room = data.rows[0];
        console.log('The data for the room:', room);
      })
      .catch((err) => console.log('Error getting the data for the room:', err));
  }
  return room;
};

// test getRoom
// sqlFunctions.getRoom().then((rooms) => console.log('RETURNED:', rooms));
// sqlFunctions
//   .getRoom('fuzzymug')
//   .then((rooms) => console.log('RETURNED:', rooms));

// getEntries
// take in a room_id parameter
// return an array of all the entries for that room
sqlFunctions.getEntries = async (roomId) => {
  let entries;
  await pool
    .query(
      `
    SELECT * FROM entries WHERE room_id = '${roomId}';
    `
    )
    .then((data) => {
      entries = data.rows;
      console.log('The data for the entry table of the room:', entries);
    })
    .catch((err) => console.log('Error getting data for the entry table', err));
  return entries;
};

// test getEntries
// sqlFunctions
//   .getEntries('bluebat')
//   .then((data) => console.log('RETURNED:', data));

// getComments
// take in an entry_id
// return array of all comments for that entry
sqlFunctions.getComments = async (entryId) => {
  let comments;
  await pool
    .query(
      `
    SELECT * FROM comments WHERE entry_id= '${entryId}';
    `
    )
    .then((data) => {
      comments = data.rows;
      console.log('The data for the comments table:', comments);
    })
    .catch((err) => console.log('Error getting data for the comments', err));

  return comments;
};

// test getComments
// sqlFunctions.getComments(2).then((data) => console.log('RETURNED:', data));
// sqlFunctions.getComments(5).then((data) => console.log('RETURNED:', data));

// getVoteCount
// take in an entry_id
// return the number of votes for that entry
sqlFunctions.getVoteCount = async (entryId) => {
  let count;
  await pool
    .query(
      `
    SELECT COUNT(*) FROM votes WHERE entry_id='${entryId}'
    `
    )
    .then((data) => {
      count = data.rows[0];
      console.log('The number of votes for the entry:', count);
    })
    .catch((err) =>
      console.log('Error getting the number of votes for the entry', err)
    );
  return count;
};

// // test getVoteCount
// sqlFunctions.getVoteCount(1).then((data) => console.log('RETURNED:', data));
// sqlFunctions.getVoteCount(2).then((data) => console.log('RETURNED:', data));
// sqlFunctions.getVoteCount(3).then((data) => console.log('RETURNED:', data));

sqlFunctions.deleteVote = async (entry_id, user_id) => {
  let vote;
  await pool
    .query(
      `
  DELETE  
  FROM votes
  WHERE user_id='${user_id}' and entry_id='${entry_id}'
  RETURNING *;
  `
    )
    .then((data) => {
      vote = data.rows[0];
      console.log('The removed vote:', vote);
    })
    .catch((err) => console.log('Error deleting the vote', err));
  return vote;
};

// // deleteVote test
// sqlFunctions.deleteVote(2, 1).then((vote) => console.log('RETURNED:', vote));

sqlFunctions.deleteRoom = async (room_id) => {
  let room;
  await pool
    .query(
      `
  DELETE
  FROM rooms
  WHERE _id = '${room_id}'
  RETURNING *;
  `
    )
    .then((data) => {
      room = data.rows[0];
      console.log('The deleted room:', room);
    })
    .catch((err) => console.log('Error deleting the room', err));
  return room;
};

// // test deleteRoom
// sqlFunctions
//   .deleteRoom('cuddlyphone')
//   .then((room) => console.log('RETURNED:', room));

//Note: this function will give an error if deleting an entry with a comment. Will need to refactor to delete associated comments first. 
sqlFunctions.deleteEntry = async (entry_id) => {
  let entry;
  await pool
    .query(
      `
  DELETE
  FROM entries
  WHERE _id = '${entry_id}'
  RETURNING *;
  `
    )
    .then((data) => {
      entry = data.rows[0];
      console.log('The deleted entry:', entry);
    })
    .catch((err) => console.log('Error deleting the entry', err));
  return entry;
};

// // test deleteEntry
// sqlFunctions.deleteEntry(4).then((entry) => console.log('RETURNED:', entry));

// update room name

module.exports = sqlFunctions;
