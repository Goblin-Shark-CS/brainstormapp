
const { PRODUCTION } = require('./config.js');

/**
/* Error handlers
*/
// Hide details from user
const quietMsg = (location, err, status=500, message=location) => {
  return {
    log: `${message}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Server error occurred in ${location}. Check server logs for more details.` },
    status
  };
};

// Debug Message: Synchronize frontend/backend
const errMsg = (message, err, status=500) => {
  const log = `${message}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`;
  return {
    log,
    message: { err: log },
    status
  };
};


/**
/* Debug message
*/
const dbg = (...args) => {
  return PRODUCTION ? undefined : console.log(...args);
};


module.exports = {quietMsg, errMsg}

