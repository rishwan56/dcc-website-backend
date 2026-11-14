require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());

const enquiryRoutes = require('./routes/enquiryRoutes');

app.use('/api/enquiries', enquiryRoutes);
// Health check API
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT NOW()');

        res.json({
            status: 'success',
            database: 'connected',
            application: 'DCC Backend'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: 'error',
            database: 'disconnected'
        }); 
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`DCC Backend running on port ${PORT}`);
});
