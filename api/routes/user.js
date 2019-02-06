const express = require("express");
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post('/login', passport.authenticate('local',
    { successRedirect: '/user/current_user', failureRedirect: '/' }
));

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/user/current_user');
});

router.delete("/:userId", checkAuth, UserController.user_delete);

router.get("/", checkAuth, UserController.user_get_users);

router.get("/:userId", checkAuth, UserController.user_get_user);

router.patch("/:userId", checkAuth, UserController.user_update_user);

module.exports = router;
