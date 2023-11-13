const sqlFunctions = require('../../sqlFunctions.js');

const sessionController = {};

const COOKIE_OPTIONS = { httpOnly: true };

// Creates a new user in the database. Then sets a cookie with the user's id.
sessionController.createUser = (req, res, next) => {
  sqlFunctions
    .addUser()
    .then((user) => {
      res.cookie('user_id', user._id);
      return next();
    })
    .catch(next);
};

/**
 * setSSIDCookie - Create a Session ID Cookie
 */
sessionController.createSession = (req, res, next) => {
  /* Create new session in database */
  const session = null;

  /* Set cookie with user session info */
  res.cookie('ssid', session, COOKIE_OPTIONS);
  return next();
};

/**
 * verify whether or not the session is still valid.
 */
sessionController.validateSession = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  /* Use cookie here */
};

module.exports = sessionController;
