const express = require('express');
const router = express.Router();
const CategoryControllers = require('../controller/categorys');

router.post('/', async (req, res) => {
    const {name} = req.body;
    try {
        await CategoryControllers.create(name);
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
    const {name} = req.body;

    try {
        await CategoryControllers.update(id, name);
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
        const list = await CategoryControllers.list();
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
        const detail = await CategoryControllers.detail(id);
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
        await CategoryControllers.delete(id);
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