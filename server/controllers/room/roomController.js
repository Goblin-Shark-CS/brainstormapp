const sqlFunctions = require('../../sqlFunctions.js');

const roomController = {};

// Add a new room to the database and put the generated room id on locals.
roomController.createRoom = (req, res, next) => {
  sqlFunctions
    .addRoom()
    .then((room) => {
      res.locals.roomId = room._id;
      return next();
    })
    .catch(next);
};

roomController.sendMessage = (req, res, next) => {
  // Handle message send
  return next();
};

roomController.loadRoom = (req, res, next) => {
  // Load initial state for room
  return next();
};

roomController.getUpdates = (req, res, next) => {
  // Request state update
  // Start out with full state refresh
  return next();
};

// [AFS] In Progress
roomController.changeRoomName = (req, res, next) => {
  // TODO: need to create a way for users to update the room name
  // 
  return next();
}

module.exports = roomController;
