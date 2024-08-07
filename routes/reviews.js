const express = require('express');
const router = express.Router();
const ReviewControllers = require('../controller/reviews');

router.post('/', async (req, res) => {
    const {book_id, user_id, review_text, rating} = req.body;
    try {
        await ReviewControllers.create(book_id, user_id, review_text, rating);
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
    const {book_id, user_id, review_text, rating} = req.body;

    try {
        await ReviewControllers.update(id, book_id, user_id, review_text, rating);
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
        const list = await ReviewControllers.list();
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
        const detail = await ReviewControllers.detail(id);
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
        await ReviewControllers.delete(id);
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