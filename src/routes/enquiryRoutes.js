const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    try {
        const { name, phone, email, service, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                status: 'error',
                message: 'Name and phone are required'
            });
        }

        const result = await pool.query(
            `INSERT INTO enquiries
             (name, phone, email, service, message)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name, phone, email || null, service || null, message || null]
        );

        res.status(201).json({
            status: 'success',
            message: 'Thank you for your enquiry! We will get back to you soon.',
            enquiry: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to save enquiry'
        });
    }
});

module.exports = router;