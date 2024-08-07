const db = require('../config/db');

const QRCode = require('qrcode');

async function generateQRCode(categoryId) {
    try {
        const qrCodeData = await QRCode.toDataURL(categoryId.toString());
        return qrCodeData;
    } catch (error) {
        throw error;
    }
}


class BookModels {
    constructor(id, title, author, publisher, publication_year, category_id, description_book, image, pdf_file, is_deleted) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publication_year = publication_year;
        this.category_id = category_id;
        this.description_book = description_book;
        this.image = image;
        this.pdf_file = pdf_file;
        this.is_deleted = is_deleted;
    }

    static async findAll() {
        try {
            const books = await db.query('SELECT * FROM books WHERE is_deleted = 0');
            return books[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM books WHERE id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0];
        } catch (error) {
            throw error
        }
    }

    static async findByCategoryId(id) {
        try {
            const query = 'SELECT * FROM books WHERE category_id = ? AND is_deleted = 0';
            const result = await db.query(query, [id]);
            return result[0];
        } catch (error) {
            throw error
        }
    }

    static async create(title, author, publisher, publication_year, category_id, description_book, image, pdf_file) {
        try {
            const qrCode = await generateQRCode(category_id);
            const query = 'INSERT INTO books (title, author, publisher, publication_year, category_id, description_book, image, pdf_file, qrcode, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)';
            const result = await db.query(query, [title, author, publisher, publication_year, category_id, description_book, image, pdf_file, qrCode]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, title, author, publisher, publication_year, category_id, description_book, image, pdf_file) {
        try {
            const query = 'UPDATE books SET title = ?, author = ?, publisher = ?, publication_year = ?, category_id = ?, description_book = ?, image = ?, pdf_file = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [title, author, publisher, publication_year, category_id, description_book, image, pdf_file, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const query = 'UPDATE books SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookModels;
