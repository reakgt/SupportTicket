/**
 * Module that creates ticket functions:
 * 
 *      get, create, update(edit), delete
 * 
 * 
 */

const Ticket = require('../models/Ticket')
const User = require('../models/User')

// @desc Get all tickets 
// @route GET /tickets
// @access Private
const getAllTickets = async (req, res) => {
    // Get all tickets from MongoDB
    const tickets = await Ticket.find().lean()

    // If no tickets 
    if (!tickets?.length) {
        return res.status(400).json({ message: 'No tickets found' })
    }

    // Add username to each ticket before sending the response 
    const ticketsWithUser = await Promise.all(tickets.map(async (ticket) => {
        const user = await User.findById(ticket.user).lean().exec()
        return { ...ticket, username: user.username }
    }))

    res.json(ticketsWithUser)
}

// @desc Create new ticket
// @route POST /tickets
// @access Private
const createNewTicket = async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Ticket.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate ticket title' })
    }

    // Create and store the new user 
    const ticket = await Ticket.create({ user, title, text })

    if (ticket) { // Created 
        return res.status(201).json({ message: 'New ticket created' })
    } else {
        return res.status(400).json({ message: 'Invalid ticket data received' })
    }

}

// @desc Update a ticket
// @route PATCH /tickets
// @access Private
const updateTicket = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm ticket exists to update
    const ticket = await Ticket.findById(id).exec()

    if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
    }

    // Check for duplicate title
    const duplicate = await Ticket.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original ticket 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate ticket title' })
    }

    ticket.user = user
    ticket.title = title
    ticket.text = text
    ticket.completed = completed

    const updatedTicket = await ticket.save()

    res.json(`'${updatedTicket.title}' updated`)
}

// @desc Delete a ticket
// @route DELETE /tickets
// @access Private
const deleteTicket = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Ticket ID required' })
    }

    // Confirm ticket exists to delete 
    const ticket = await Ticket.findById(id).exec()

    if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
    }

    const result = await ticket.deleteOne()

    const reply = `Ticket '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllTickets,
    createNewTicket,
    updateTicket,
    deleteTicket
}