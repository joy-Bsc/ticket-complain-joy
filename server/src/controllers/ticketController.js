const TicketComplain = require('../models/TicketModel');

exports.createTicket = (req, res) => {
    const { subject, description } = req.body;
    const userId = req.user.id;
    const role = req.user.role;
    if (role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    else{
        TicketComplain.create(userId, subject, description, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error creating ticket' });
            res.status(200).json({ message: 'Ticket created successfully', ticketId: result.insertId });
        });
    }
};

exports.getUserTickets = (req, res) => {
    const userId = req.user.id;
     
    TicketComplain.getUserTickets(userId, (err, tickets) => {
        if (err) return res.status(500).json({ message: 'Error fetching tickets' });
        res.status(200).json(tickets);
    });
};

exports.getAllTickets = (req, res) => {
    const role = req.user.role;
   if (role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    } 
    else{
        TicketComplain.getAllTickets((err, tickets) => {
            if (err) return res.status(500).json({ message: 'Error fetching all tickets' });
            res.status(200).json(tickets);
        });
    }
};

exports.updateTicket = (req, res) => {
    const { ticketId } = req.params;
    const { subject, description } = req.body;

    TicketComplain.updateTicket(ticketId, subject, description, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error updating ticket' });
        res.status(200).json({ message: 'Ticket updated successfully' });
    });
};

exports.deleteTicket = (req, res) => {
    const { ticketId } = req.params;

    TicketComplain.deleteTicket(ticketId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting ticket' });
        res.status(200).json({ message: 'Ticket deleted successfully' });
    });
};

exports.updateStatus = (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body; 
    const role = req.user.role;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    } 
    else{
        if (!['Resolved', 'Closed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
    
        TicketComplain.updateStatus(ticketId, status, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error updating status' });
            res.status(200).json({ message: 'Status updated successfully' });
        });
    }
};


