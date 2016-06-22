const express = require('express');
const path = require('path');
const logger = require('morgan');
const api = require('./api');
const http = require('http');
const SocketIo = require('socket.io');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


/* Start server */

const server = app.listen(8080,'localhost',function(){
  console.log("API server on");
})

const io = new SocketIo(server,{path:'/api/game'});
const socketevent = require('./socket')(io);

