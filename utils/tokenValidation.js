const jwt = require('jsonwebtoken');

module.exports = function(sessionId) {
    try {
        const decode = jwt.verify(sessionId,process.env.JWT_SECRET);
        return decode.sub;
    } catch (error) {
        return false;
    }
}