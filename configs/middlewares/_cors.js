const cors = require('cors')
const allowed_origins = require('../env/origins')

const corsOptions = {
    origin: function (origin, callback) {
        if (allowed_origins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = cors(corsOptions)
