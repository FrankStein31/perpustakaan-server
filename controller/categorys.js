const CategoryModels = require('../model/categorys')

class CategoryControllers {
    constructor() {
        this.CategoryModels = CategoryModels;
    }

    async create(name) {
        return await this.CategoryModels.create(name);
    }

    async update(id, name) {
        return await this.CategoryModels.update(id, name);
    }

    async list() {
        return await this.CategoryModels.findAll();
    }

    async detail(id) {
        return await this.CategoryModels.findById(id);
    }

    async delete(id) {
        return await this.CategoryModels.delete(id);
    }
}

module.exports = new CategoryControllers();