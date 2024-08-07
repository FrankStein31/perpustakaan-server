const express = require('express');
const router = express.Router();
const UserControllers = require('../controller/users');

router.post('/', async (req, res) => {
    const {name, email, password, nis, user_class, role, access_token} = req.body;
    try {
        await UserControllers.create(name, email, password, nis, user_class, role, access_token);
        res.status(201).json({
            "status": 200,
            "message": "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {name, email, password, nis, user_class, role, access_token} = req.body;

    try {
        await UserControllers.update(id, name, email, password, nis, user_class, role, access_token);
        res.status(200).json({
            "status": 200,
            "message": "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

router.put('/verif/:email', async (req, res) => {
    const email = req.params.email;

    try {
        await UserControllers.verif(email)
        res.status(200).json({
            "status": 200,
            "message": "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const list = await UserControllers.list();
        res.status(200).json({
            "status": 200,
            "message": "success",
            "data": list
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const detail = await UserControllers.detail(id);
        res.status(200).json({
            "status": 200,
            "message": "success",
            "data": detail
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await UserControllers.delete(id);
        res.status(200).json({
            "status": 200,
            "message": "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "status": 500,
            "message": error.message
        });
    }
});

module.exports = router;