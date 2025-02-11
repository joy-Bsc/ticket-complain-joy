const express = require('express');
const { createUser,loginUser } = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');

const router = express.Router();


router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to your profile!', user: req.user });
});
router.post('/create',authenticateToken,ticketController.createTicket);
router.get('/tickets',authenticateToken,ticketController.getUserTickets);
router.get('/allTickets',authenticateToken,ticketController.getAllTickets);
router.put('/update/:ticketId',authenticateToken,ticketController.updateTicket);
router.delete('/delete/:ticketId',authenticateToken,ticketController.deleteTicket);
router.put('/updateStatus/:ticketId',authenticateToken,ticketController.updateStatus);


module.exports = router;