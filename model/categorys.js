const db = require('../config/db');

class CategoryModels {
    constructor(id, name, is_deleted) {
        this.id = id;
        this.name = name;
        this.is_deleted = is_deleted;
    }

    static async findAll() {
        try {
            const categorys = await db.query('SELECT * FROM categorys WHERE is_deleted = 0');
            return categorys[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM categorys WHERE id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0];
        } catch (error) {
            throw error
        }
    }

    static async create(name) {
        try {
            const query = 'INSERT INTO categorys (name, is_deleted) VALUES (?, 0)';
            const result = await db.query(query, [name]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, name) {
        try {
            const query = 'UPDATE categorys SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [name, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const query = 'UPDATE categorys SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryModels;