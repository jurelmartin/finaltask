const authentication = require('./src/main/authentication');
const authorization = require('./src/main/authorization')
const paths = require('./src/_helper/paths')

module.exports = {
    authentication,
    authorization,
    paths
}