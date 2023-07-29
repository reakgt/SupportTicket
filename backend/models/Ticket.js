/*
 *  The schema for a Ticket
 *
 * Current fields:
 * 
 *  User
 *  Title
 *  Details
 *  Completion Status
 *  Timestamp - Creation / Update
 *  Ticket Id
 * 
 */

const mongoose = require('mongoose')
const { autoIncrement } = require('mongoose-plugin-autoinc')


const ticketSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
},
    {
    timestamps: true
    }
)

ticketSchema.plugin(autoIncrement, {
    model: 'ticket',
    field: 'ticketId',
    startAt: 250
});

module.exports = mongoose.model('Ticket', ticketSchema)