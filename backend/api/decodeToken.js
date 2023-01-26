const jwt = require('jwt-simple')
const { authSecret } = require('../.env')

module.exports = app => {
    const decodeToken = (token) => {
        return jwt.decode(token.substring(7), authSecret)    
    }

    return { decodeToken }
}