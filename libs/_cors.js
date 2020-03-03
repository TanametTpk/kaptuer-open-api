const cors = require('cors')

const createCors = (allowed_origins) => {

    const corsOptions = {
        origin: function (origin, callback) {
            if (allowed_origins.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

    return cors(corsOptions)

}

module.exports = createCors
