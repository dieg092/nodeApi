const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const taskRoutes = require('./api/routes/task');
const userRoutes = require('./api/routes/user');
require('./api/services/passport');

mongoose.connect('mongodb://localhost:27017/bgroup', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCnpm H, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
