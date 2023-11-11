//import pool

const sqlFunctions = {};

//insert a room into the database
sqlFunctions.addRoom = (id, roomname = null, password = null) => {
  const values = [id, roomname, password];
  pool
    .query(
      `
    INSERT INTO rooms (_id, roomname, password)
    VALUES ($1, $2, $3)
  `,
      values
    )
    .then()
    .catch((err) => console.log('Error adding a room to the database:', err));
};

module.exports = sqlFunctions;
