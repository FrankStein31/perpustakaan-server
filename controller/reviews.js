const ReviewModels = require("../model/reviews");

class ReviewControllers {
    constructor() {
        this.ReviewModels = ReviewModels
    }

    async create(book_id, user_id, review_text, rating) {
        return await this.ReviewModels.create(book_id, user_id, review_text, rating);
    }

    async update(id, book_id, user_id, review_text, rating) {
        return await this.ReviewModels.update(id, book_id, user_id, review_text, rating);
    }

    async list() {
        return await this.ReviewModels.findAll();
    }

    async detail(id) {
        return await this.ReviewModels.findById(id);
    }

    async delete(id) {
        return await this.ReviewModels.delete(id);
    }
}

module.exports = new ReviewControllers();