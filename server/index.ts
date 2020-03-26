const app = require('./server');

// start our server on port 4201
app.listen(8080, '127.0.0.1', function() {
  console.log('Server now listening on 8080');
});
