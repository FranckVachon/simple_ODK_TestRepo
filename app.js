var express = require('express')
var morgan = require('morgan')

var vhosts = require('./routes/vhosts')
//var github = require('./routes/github')
//var firebase = require('./routes/firebase')
//var gist = require('./routes/gist')
var aliases = require('./routes/aliases')
var error = require('./controllers/error-handler')
var app = express()
/** Logger **/
var logger = require('./logger')
//logger.debugLevel = 'info';
//logger.log('info','Logger is working');

app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Simple ODK Server ready to receive submissions')
})

app.use('/', vhosts)
logger.log('info','vhosts: '+ vhosts);

//app.use('/gh/:user/:repo', github)
//logger.log('info','Github: '+ github);


//app.use('/fb/:appname', firebase)
//logger.log('info','Firebase: '+ firebase);
//app.use('/gist/:gist_id', gist)
//logger.log('info','Github: '+ github);
app.use('/:alias', aliases)
//logger.log('info','Aliases: '+ aliases);
// Handle errors
app.use(error)

module.exports = app
