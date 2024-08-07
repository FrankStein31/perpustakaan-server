const db = require('../config/db');

class UserModels {
    constructor(id, name, email, password, nis, user_class, role, access_token, is_deleted) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.nis = nis;
        this.class = user_class;
        this.role = role;
        this.access_token = access_token;
        this.is_deleted = is_deleted;
    }

    static async findAll() {
        try {
            const users = await db.query('SELECT * FROM users WHERE is_deleted = 0');
            return users[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM users WHERE id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0];
        } catch (error) {
            throw error
        }
    }

    static async create(name, email, password, nis, user_class, role, access_token) {
        try {
            const query = 'INSERT INTO users (name, email, password, nis, class, role, access_token, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, 0)';
            const result = await db.query(query, [name, email, password, nis, user_class, role, access_token]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, name, email, password, nis, user_class, role, access_token) {
        try {
            const query = 'UPDATE users SET name = ?, email = ?, password = ?, nis = ?, class = ?, role = ?, access_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [name, email, password, nis, user_class, role, access_token, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async verif(email) {
        try {
            const query = 'UPDATE users SET role = "student" WHERE email = ?';
            const result = await db.query(query, [email]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const query = 'UPDATE users SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModels;