const generator = require('./generator');
const downloadRepoUtils = require('./downloadRepo');
const logger = require('./logger');
const spinner = require('./spinner');
const WelcomeMessage = require('./welcome');

module.exports = {
    generator,
    downloadRepo: downloadRepoUtils.downloadRepo,
    downloadFromGitHub: downloadRepoUtils.downloadFromGitHub,
    downloadTemplate: downloadRepoUtils.downloadTemplate,
    logger,
    spinner,
    WelcomeMessage
}; 