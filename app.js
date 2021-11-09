var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var addRouter = require('./routes/add');
var delRouter = require('./routes/del');
var logRouter = require('./routes/log');
var delClientListRouter = require('./routes/delClientList');
var addUserListRouter = require('./routes/addUserList');
var addClientListRouter = require('./routes/addClientList');
var showUserListRouter = require('./routes/showUserList');
var showClientListRouter = require('./routes/showClientList');
var editClientListRouter = require('./routes/editClientList');
var uploadClientListRouter = require('./routes/uploadClientList');
var showUploadClientListRouter = require('./routes/showUploadClientList');
var getsRouter = require('./routes/gets');

var app = express();
const cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/add', addRouter);
app.use('/del', delRouter);
app.use('/log', logRouter);
app.use('/api/delClientList', delClientListRouter);
app.use('/api/addUserList', addUserListRouter);
app.use('/api/addClientList', addClientListRouter);
app.use('/api/showUserList', showUserListRouter);
app.use('/api/showClientList', showClientListRouter);
app.use('/api/editClientList', editClientListRouter);
app.use('/api/uploadClientList', uploadClientListRouter);
app.use('/api/showUploadClientList', showUploadClientListRouter);
app.use('/gets', getsRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
