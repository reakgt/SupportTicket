/**  
 *  Module that verifies origin requests to the backend
 *
 */

const allowedOrigins = require('./allowedOrigins')

// CORS - cross origin resource sharing
const corsOptions = {
    origin: (origin, callback) => {
           // if in allowedOrigins  OR  has no origin
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    // status 204 is default but has issues with some devices
    optionsSuccessStatus: 200
}

module.exports = corsOptions