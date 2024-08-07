const db = require('../config/db');

class ReviewModels {
    constructor(id, book_id, user_id, review_text, rating, is_deleted) {
        this.id = id;
        this.book_id = book_id;
        this.user_id = user_id;
        this.review_text = review_text;
        this.rating = rating;
        this.is_deleted = is_deleted;
    }

    static async findAll() {
        try {
            const reviews = await db.query('SELECT * FROM reviews WHERE is_deleted = 0');
            return reviews[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM reviews WHERE id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0];
        } catch (error) {
            throw error
        }
    }

    static async create(book_id, user_id, review_text, rating) {
        try {
            const query = 'INSERT INTO reviews (book_id, user_id, review_text, rating, is_deleted) VALUES (?, ?, ?, ?, 0)';
            const result = await db.query(query, [book_id, user_id, review_text, rating]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, book_id, user_id, review_text, rating) {
        try {
            const query = 'UPDATE reviews SET book_id = ?, user_id = ?, review_text = ?, rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [book_id, user_id, review_text, rating, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const query = 'UPDATE reviews SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReviewModels;