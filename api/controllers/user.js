const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt   = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const CONSTANTS = require('../config/constants');
const Mailer = require('../services/Mailer');
const User = require("../models/user");
const Token = require("../models/token");

let host, linkConfirmar, linkRegenerar, mailOptions;

exports.user_signup = (req, res, next) => {
  const { email, password, passRepeat, lang } = req.body;

  if (password === passRepeat) {
    User.find({ email: email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          res.send('Mail exists');
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(password, null, null, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: hash
              });
              user
                .save()
                .then(async (user) => {
                  const token = await new Token({
                    _id: new mongoose.Types.ObjectId(),
                    _user: user._id,
                    type: CONSTANTS.token_types.verify_email,
                    token: crypto.randomBytes(16).toString('hex')
                  });

                  token
                  .save()
                    .then(async (token) => {
                        user._tokens.push(token._id);
                        user.save();

                        host = req.get('host');
                        linkConfirmar = "http://" + host + "/api/user/signup/" + lang + '/' + token.token + '/' + email;
                        linkRegenerar = "http://" + host + "/api//user/regenerate/" + lang + '/' + email;

                        mailOptions={
                          from: CONSTANTS.mail.from,
                          to: email,
                          subject: 'Verificiación de Cuenta',
                          text: 'Verifique su correo',
                          html: '<div><h3>Verifique su correo pulsando<a href="' + linkConfirmar + '"> AQUÍ</a></h3></div>\n <div><h4>Si se ha expirado la verificación, pulse<a href="' + linkRegenerar + '"> AQUÍ</a></h4></div>',
                        };

                        Mailer.newMail(mailOptions, req);
                        res.send('OK');
                        // res.status(201).json({
                        //   message: "User created"
                        // });
                    })
                    .catch((err) => {
                      console.log(err)
                      return res.status(500).send({ msg: err.message });
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
  } else {
    res.send('ERROR');
    res.status(500).json({
      error: err
    });
  }

};

exports.user_login = (req, res, next) => {

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(user)
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
      console.log('hehehe')
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

exports.user_signup_token_email = async (req, res, next) => {
  const { lang, token, email } = req.params;

  await Token.findOne({ token: token })
    .populate('_user')
    .exec(async (err, token) => {
      console.log(token)
        if (token) {
          console.log(token)
          if (token._user.isVerified) {
            res.redirect('/' + lang + '/signup/verify');
          } else {
            User.updateOne(
              {
                'email': token._user.email,
                'isVerified': false
              },
              {
                $set: { 'isVerified': true }
              }
            ).exec((err, result) => {
                Token.deleteOne({ token: token.token }, (err, result) => {
                  if (!err) {
                    res.redirect('/' + lang + '/signup/verify');
                  }
                });
            });
          }
      } else {
        res.redirect('/api/user/regenerate/' + lang + '/' + email);
      }
    });
}

exports.user_regenerate_verify = async (req, res, next) => {
  const { lang, email } = req.params;

  User.findOne({ email: email })
    .populate('_tokens')
    .exec(async (err, user) => {
      if (user.isVerified) {
        res.redirect('/' + lang + '/signup/verify');
      } else {
        let count = 0;
        user._tokens.forEach((tok) => {
          console.log(CONSTANTS.token_types.verify_email);
          console.log(tok.type)
          if (tok.type === CONSTANTS.token_types.verify_email) {
            console.log('hey')
            res.redirect('/' + lang);
            res.send('OK');
          }
        });
        const token = await new Token({
          _id: new mongoose.Types.ObjectId(),
          _user: user._id,
          type: CONSTANTS.token_types.verify_email,
          token: crypto.randomBytes(16).toString('hex')
        });

        token
          .save((err) => {
            if (err) { return res.status(500).send({ msg: err.message }); }

            user._tokens.push(token._id);
            user.save();

            host = req.get('host');
            linkConfirmar = "http://" + host + "/api/user/signup/" + lang + '/' + token.token + '/' + email;
            linkRegenerar = "http://" + host + "/api//user/regenerate/" + lang + '/' + email;

            mailOptions={
              from: CONSTANTS.mail.from,
              to: email,
              subject: 'Verificiación de Cuenta',
              text: 'Verifique su correo',
              html: '<div><h3>Verifique su correo pulsando<a href="' + linkConfirmar + '"> AQUÍ</a></h3></div>\n <div><h4>Si se ha expirado la verificación, pulse<a href="' + linkRegenerar + '"> AQUÍ</a></h4></div>',
            };

            Mailer.newMail(mailOptions, req);
            res.redirect('/' + lang +'/signup/resend');
        });
      }
    });
}


exports.user_remember_password = async (req, res, next) => {
  //¿Existe el usuario?emailRemember
  const { emailRemember, lang } = req.body;
  const user =  await User.findOne({ email : emailRemember.toLowerCase(), isVerified: true });

  if (!user) {
    res.send('Correo no encontrado');
  } else {
    const token = await new Token({
      _id: new mongoose.Types.ObjectId(),
      _user: user._id,
      type: CONSTANTS.token_types.regenerate_pass,
      token: crypto.randomBytes(16).toString('hex')
    });

    token.save((err, token) => {
      if (err) { return res.status(500).send({ msg: err.message }); }

      host = req.get('host');
      linkRegenerar = 'http://' + host + '/' + lang + '/remember/' + token.token;
      mailOptions={
        from: CONSTANTS.mail.from,
        to: emailRemember,
        subject: 'Recuperación de cuenta',
        text: 'Aquí tiene el link para regenerar su contraseña.',
        html: 'Para regenerar su contraseña pulse <a href="' + linkRegenerar + '">AQUÍ</a>.',
      };

      Mailer.newMail(mailOptions, req);
    });
    res.send('OK');
  }
  //Emvoar correo con Link con token
}

exports.user_token = async (req, res, next) => {
  const { lang, token } = req.params;
  console.log(lang)
  Token.findOne({ token: token }, (err, result) => {
    console.log(err)
    if(result) {
      res.send('OK');
    } else {

      res.send('err');
    }
  });
}

exports.user_remember_token = async (req, res, next) => {
  const { lang, token } = req.params;
  const { contrasenaRemember } = req.body;

  const tok = await Token.findOne({ token: token});
  let update = {};

  if (tok !== null) {
    bcrypt.hash(contrasenaRemember, null, null, (err, hash) => {
        update.password = hash;

        User.findOneAndUpdate(
          {
            _id: tok._user
          },
            update
        ).exec((err, result) => {
          console.log(result)
          if (!err) {
            Token.deleteMany({ _user: result._id, type: CONSTANTS.token_types.regenerate_pass }, (err, result) => {
              res.send('OK');
            })

          } else {
            res.send('ERROR');
          }
        });
    });
  } else {
      res.send('ERROR');

  }
}
