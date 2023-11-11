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

//sqlFunctions.addRoom(1, 'newroom', '123');
console.log('FINISHED');

module.exports = sqlFunctions;
