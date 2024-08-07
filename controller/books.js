const BookModels = require('../model/books');
const CategoryModels = require('../model/categorys');
const GeofanceModels = require('../model/geofance')
const geolib = require('geolib');

class BookControllers {
    constructor() {
        this.BookModels = BookModels;
        this.CategoryModels = CategoryModels;
        this.GeofanceModels = GeofanceModels;
    }

    async create(title, author, publisher, publication_year, category_id, description_book, image, pdf_file) {
        return await this.BookModels.create(title, author, publisher, publication_year, category_id, description_book, image, pdf_file);
    }

    async update(id, title, author, publisher, publication_year, category_id, description_book, image, pdf_file) {
        let book = await this.BookModels.findById(id);
        if (book.title != title) {
            book.title = title
        }

        if (book.author != author) {
            book.author = author
        }

        if (book.publisher != publisher) {
            book.publisher = publisher
        }

        if (book.publication_year != publication_year) {
            book.publication_year = publication_year
        }

        if (book.category_id != category_id) {
            book.category_id = category_id
        }

        if (book.description_book != description_book) {
            book.description_book = description_book
        }

        if (book.image != image) {
            book.image = image
        }

        if (book.pdf_file != pdf_file) {
            book.pdf_file = pdf_file
        }

        return await this.BookModels.update(id, book.title, book.author, book.publisher, book.publication_year, book.category_id, book.description_book, book.image, book.pdf_file);
    }

    async list() {
        // Ambil semua buku
        let books = await this.BookModels.findAll();

        // Ambil semua kategori yang dibutuhkan sekaligus
        const categoryIds = books.map(book => book.category_id);
        const categories = await this.CategoryModels.findAll({
            where: {
                id: categoryIds
            }
        });

        // Buat mapping dari category_id ke nama kategori
        const categoryMap = categories.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
        }, {});

        // Tambahkan nama kategori ke setiap buku jika belum ada
        books = books.map(book => {
            if (!book.hasOwnProperty('categoryName')) {
                book.categoryName = categoryMap[book.category_id] || 'Unknown';
            }
            return book;
        });

        return books;
    }

    async listByCategory(id, lat, long) {
        var centerDB = await this.GeofanceModels.findById(1);
        const center = { latitude: parseFloat(centerDB.latitude), longitude: parseFloat(centerDB.longitude) }
        const userLocation = { latitude: parseFloat(lat), longitude: parseFloat(long) };
        const radius = parseInt(centerDB.radius);
        if (!geolib.isPointWithinRadius(userLocation, center, radius)) {
            return {
                status: 401,
                message: "Lokasi anda berada diluar jangkaun",
                data: {}
            };
        }

        let books = await this.BookModels.findByCategoryId(id);

        // Ambil semua kategori yang dibutuhkan sekaligus
        const categoryIds = books.map(book => book.category_id);
        const categories = await this.CategoryModels.findAll({
            where: {
                id: categoryIds
            }
        });

        // Buat mapping dari category_id ke nama kategori
        const categoryMap = categories.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
        }, {});

        // Tambahkan nama kategori ke setiap buku jika belum ada
        books = books.map(book => {
            if (!book.hasOwnProperty('categoryName')) {
                book.categoryName = categoryMap[book.category_id] || 'Unknown';
            }
            return book;
        });

        return books;
    }

    async detail(id) {
        try {
            // Temukan buku berdasarkan id
            var book = await this.BookModels.findById(id);
            const category = await this.CategoryModels.findById(book[0].category_id)
            let categoryName = 'Unknown';
            if (category) {
                categoryName = category[0].name || 'Unknown';
            }

            book[0].categoryName = categoryName;
    
            return book;
        } catch (error) {
            console.error('Error fetching book details:', error);
            throw error;
        }
    }
    
    

    async delete(id) {
        return await this.BookModels.delete(id);
    }
}

module.exports = new BookControllers();
