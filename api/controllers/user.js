const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  const { emailSignUp, passwordSignUp } = req.body;

  User.find({ email: emailSignUp })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.send('Mail exists');
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(passwordSignUp, null, null, (err, hash) => {
          console.log(hash)
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: emailSignUp,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.send('OK')
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.send('ERROR');
      res.status(500).json({
        error: err
      });
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "10h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.user_get_users = (req, res, next) => {
  User.find()
      .select("email date")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs.map(doc => {
            return {
              email: doc.email,
              _id: doc._id,
              date: doc.date,
              request: {
                type: "GET",
                url: "http://localhost:5000/user/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

exports.user_get_user = (req, res, next) => {
  console.log(req.userData)
  const id = req.params.userId;
    User.findById(id)
      .select("email date")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            user: doc,
            request: {
              type: "GET",
              url: "http://localhost:5000/user"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};

//[{"propName": "", "value": ""}, {"propName": "", "value": ""}]
exports.user_update_user = (req, res, next) => {
  const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/user/" + id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

exports.user_logout = (req, res, next) => {
  console.log(req.userData)
};
