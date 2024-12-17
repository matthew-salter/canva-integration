const axios = require('axios');

module.exports = async (req, res) => {
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
};

