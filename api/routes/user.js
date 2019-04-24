const express = require("express");
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post('/login', passport.authenticate('local',
    { successRedirect: './current_user', failureRedirect: '/' }
));

router.get('/current_user', (req, res) => {
   res.send({
     'user': req.user,
     'locale': req.get('accept-language').split('-')[0]
   });
});

router.get('/logout', (req, res) => {
  // req.headers.referer.split('/')[3]
  req.logout();
  res.redirect('/');
});



router.get('/signup/:lang/:token/:email',  UserController.user_signup_token_email);

router.get('/regenerate/:lang/:email', UserController.user_regenerate_verify);

router.get('/:lang/:token', UserController.user_token);

router.post('/remember/:lang', UserController.user_remember_password);

router.post('/remember/:lang/:token', UserController.user_remember_token);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.get("/", checkAuth, UserController.user_get_users);

router.get("/:userId", checkAuth, UserController.user_get_user);

router.patch("/:userId", checkAuth, UserController.user_update_user);

module.exports = router;
