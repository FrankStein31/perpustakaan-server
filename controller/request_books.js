const RequestBookModels = require("../model/request_books");

class RequestBookControllers {
    constructor() {
        this.RequestBookModels = RequestBookModels
    }

    async create(user_id, request_text) {
        return await this.RequestBookModels.create(user_id, request_text);
    }

    async update(id, user_id, request_text) {
        return await this.RequestBookModels.update(id, user_id, request_text);
    }

    async list() {
        return await this.RequestBookModels.findAll();
    }

    async detail(id) {
        return await this.RequestBookModels.findById(id);
    }

    async delete(id) {
        return await this.RequestBookModels.delete(id);
    }
}

module.exports = new RequestBookControllers();