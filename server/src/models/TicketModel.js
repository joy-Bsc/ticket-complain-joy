const db = require('../../db');

// Automatically create TicketComplain table if it does not exist
const createTableSQL = `
    CREATE TABLE IF NOT EXISTS TicketComplain (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        subject VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('Pending', 'Resolved', 'Closed') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

db.query(createTableSQL, (err, result) => {
    if (err) {
        console.error('Error creating TicketComplain table:', err);
        return;
    }
    console.log('TicketComplain table is ready.');
});

const TicketComplain = {
    create: (userId, subject, description, callback) => {
        const sql = 'INSERT INTO TicketComplain (user_id, subject, description) VALUES (?, ?, ?)';
        db.query(sql, [userId, subject, description], callback);
    },

    getUserTickets: (userId, callback) => {
        const sql = 'SELECT * FROM TicketComplain WHERE user_id = ?';
        db.query(sql, [userId], callback);
    },

    getAllTickets: (callback) => {
        const sql = 'SELECT * FROM TicketComplain';
        db.query(sql, callback);
    },

    updateTicket: (ticketId, subject, description, callback) => {
        const sql = 'UPDATE TicketComplain SET subject = ?, description = ? WHERE id = ?';
        db.query(sql, [subject, description, ticketId], callback);
    },

    deleteTicket: (ticketId, callback) => {
        const sql = 'DELETE FROM TicketComplain WHERE id = ?';
        db.query(sql, [ticketId], callback);
    },

    updateStatus: (ticketId, status, callback) => {
        const sql = 'UPDATE TicketComplain SET status = ? WHERE id = ?';
        db.query(sql, [status, ticketId], callback);
    }
};

module.exports = TicketComplain;
