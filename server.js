const express = require('express');
const app = express();
const port = 3000;
const { fetchData } = require('./fetchData');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get a list of email addresses
app.get('/emails', async (req, res) => {
    try {
        const data = await fetchData();  // Fetch all data
        const emailList = Object.keys(data.aggregateData);  // Extract email addresses from aggregateData
        res.json({ emails: emailList });  // Send email list as JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get data for a specific email
app.get('/data', async (req, res) => {
    const email = req.query.email;  // Get email from query parameters
    try {
        const data = await fetchData();  // Fetch all data
        if (email && data.emailDateData[email]) {
            res.json({ emailDateData: { [email]: data.emailDateData[email] } });  // Send data for the specific email
        } else {
            res.status(400).json({ error: 'Invalid email' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
