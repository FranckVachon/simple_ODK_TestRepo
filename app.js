var express = require('express')
var morgan = require('morgan')

var vhosts = require('./routes/vhosts')
var github = require('./routes/github')
var firebase = require('./routes/firebase')
var gist = require('./routes/gist')
var aliases = require('./routes/aliases')
var error = require('./controllers/error-handler')

var app = express()

/** Quick custom logger  **/
var logger = exports;
logger.debugLevel = 'info';
logger.log = function(level, message) {
   var levels = ['error','warn','info'];
   if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel)) {
      if (typeof message !== 'string') {
      message = JSON.stringify(message);
      };
      console.log(level+': '+message); 
   }
}
/** End of logger **/


app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Simple ODK Server ready to receive submissions')
})

app.use('/', vhosts)

app.use('/gh/:user/:repo', github)

app.use('/fb/:appname', firebase)

app.use('/gist/:gist_id', gist)

app.use('/:alias', aliases)

// Handle errors
app.use(error)

module.exports = app
