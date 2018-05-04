const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cors         = require('cors');

const index = require('./routes/index');
const journalRouter = require('./routes/api/journal-entries');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/journal-development', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', index);
app.use('/journal-entries', journalRouter)


app.all('/*', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not-found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
