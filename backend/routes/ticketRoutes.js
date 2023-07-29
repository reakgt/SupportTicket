/**
 *  Routes ot get, add(post), update(patch), and delete tickets
 * 
 */

const express = require('express')
const router = express.Router()
const ticketsController = require('../controllers/ticketsController')
const verifyJWT = require('../middleware/verifyJWT')

//adds verifyJWT to all the routes in file
router.use(verifyJWT)

router.route('/')
    .get(ticketsController.getAllTickets)
    .post(ticketsController.createNewTicket)
    .patch(ticketsController.updateTicket)
    .delete(ticketsController.deleteTicket)

module.exports = router
