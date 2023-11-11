const roomController = {}



roomController.sendMessage = (req, res, next) => {
  // Handle message send
  return next();
}

roomController.loadRoom = (req, res, next) => {
  // Load initial state for room
  return next();
}

roomController.getUpdates = (req, res, next) => {
  // Request state update
  // Start out with full state refresh
  return next();
}


module.exports = roomController;