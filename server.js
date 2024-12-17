const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Log environment variables to verify they are loaded correctly
console.log("CANVA_CLIENT_ID:", process.env.CANVA_CLIENT_ID);
console.log("REDIRECT_URL:", process.env.REDIRECT_URL);

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// OAuth Redirect Endpoint
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('Missing authorization code');
    }

    try {
        const response = await axios.post('https://www.canva.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.CANVA_CLIENT_ID,
            client_secret: process.env.CANVA_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URL,
        });

        const accessToken = response.data.access_token;
        res.send(`Access Token: ${accessToken}`);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching access token');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

