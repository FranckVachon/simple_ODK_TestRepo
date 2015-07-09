var debug = require('debug')('simple-odk:check-config')

var logger = require('../logger')
logger.debugLevel = 'info';
logger.log('info','Check-config helpers ');
logger.log('info','Config.formstore '+config.formStore);

module.exports = function (config, route) {
  logger.log('info','Module.export function ');
  switch (config.formStore) {
    case 'github':
      logger.log('info','Module.export case github ');
      if (!config.repo || !config.user) {
        throw new Error('You must provide `repo` and `user` in domain config')
      } else {
        debug('using Github repo %s for %s', config.user + '/' + config.repo, route)
      }
      break

    case 'firebase':
      logger.log('info','Module.export case firebase ');
      if (!config.appname) {
        throw new Error('You must provide a firebase `appname` in domain config')
      } else {
        debug('using Firebase app % for %s', config.appname, route)
      }
      break

    case 'gist':
      logger.log('info','Module.export case gist ');
      if (!config.gist_id) {
        throw new Error('You must provide a Gist `gist_id` in domain config')
      } else {
        debug('using Gist id %s for %s', config.gist_id, route)
      }
      break

    default:
    logger.log('info','Module.export case default case ');
      throw new Error('No valid formStore found')
  }
}
