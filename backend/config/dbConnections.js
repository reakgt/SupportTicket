/** 
 *  module that connects to the database
 * 
 *   DATABASE_URI  -- should be a settle variable in .env file
 */

const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    } catch(err){
        console.log(err)
    }
}

module.exports = connectDB