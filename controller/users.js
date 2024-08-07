const UserModels = require('../model/users')

class UserControllers {
    constructor() {
        this.UserModels = UserModels;
    }

    async create(name, email, password, nis, user_class, role, access_token){
        return await this.UserModels.create(name, email, password, nis, user_class, role, access_token);
    }

    async update(id, email, password, nis, user_class, role, access_token){
        return await this.UserModels.update(id, email, password, nis, user_class, role, access_token);
    }

    async verif(email) {
        return await this.UserModels.verif(email);
    }

    async list() {
        return await this.UserModels.findAll();
    }

    async detail(id) {
        return await this.UserModels.findById(id);
    }

    async delete(id) {
        return await this.UserModels.delete(id);
    }
}

module.exports = new UserControllers();