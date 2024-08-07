const express = require('express');
const router = express.Router();
const RequestBookControllers = require('../controller/request_books');

router.post('/', async (req, res) => {
    const {user_id, request_text} = req.body;
    try {
        await RequestBookControllers.create(user_id, request_text);
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
    const {user_id, request_text} = req.body;

    try {
        await RequestBookControllers.update(id, user_id, request_text);
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
        const list = await RequestBookControllers.list();
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
        const detail = await RequestBookControllers.detail(id);
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
        await RequestBookControllers.delete(id);
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