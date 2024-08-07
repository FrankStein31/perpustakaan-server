const db = require('../config/db');

class RequestBookModels {
    constructor(id, user_id, request_text, is_deleted) {
        this.id = id;
        this.user_id = user_id;
        this.request_text = request_text;
        this.is_deleted = is_deleted
    }

    static async findAll() {
        try {
            const requestBooks = await db.query('SELECT * FROM request_books WHERE is_deleted = 0');
            return requestBooks[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM request_books WHERE id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0];
        } catch (error) {
            throw error
        }
    }

    static async create(user_id, request_text) {
        try {
            const query = 'INSERT INTO request_books (user_id, request_text, is_deleted) VALUES (?, ?, 0)';
            const result = await db.query(query, [user_id, request_text]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, user_id, request_text) {
        try {
            const query = 'UPDATE request_books SET user_id = ?, request_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [user_id, request_text, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const query = 'UPDATE request_books SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RequestBookModels;