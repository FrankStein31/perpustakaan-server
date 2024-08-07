const express = require('express');
const router = express.Router();
const AuthControllers = require('../controller/auth')

router.post('/login', async (req, res) => {
    const {lat, long} = req.headers;
    const {email, password} = req.body;
    try {
        var data = await AuthControllers.login(email, password, lat, long);
        res.status(data.status).json({
            "status": data.status,
            "message": data.message,
            "token": data.token,
            "data": data.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

router.post('/register', async (req, res) => {
    const {lat, long} = req.headers;
    const {name, email, password, nis, user_class} = req.body;
    try {
        var data = await AuthControllers.register(name, email, password, nis, user_class, lat, long);
        res.status(data.status).json({
            "status": data.status,
            "message": data.message
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        })
    }
})

module.exports = router;