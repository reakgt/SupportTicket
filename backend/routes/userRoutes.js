/**
 *  Routes to get, add(post), update(patch), and delete users
 * 
 */

const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

//adds verifyJWT to all the routes in file
router.use(verifyJWT)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router