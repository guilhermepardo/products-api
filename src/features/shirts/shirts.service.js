const MongoCollection = require('../../../config/mongodb/Collection');
class Service {
    constructor(database) {
        this.collection = new MongoCollection(database, 'shirts');
    };

    async post(body) {
        try {
            const shirt = await this.collection.insertOne(body);

            return shirt;

        } catch (error) {
            throw error;
        };
    };

    async get() {
        try {
            const shirts = await this.collection.find();

            return shirts;

        } catch (error) {
            throw error;
        };
    };

    async getById(id) {
        try {
            const shirt = await this.collection.findById(id);

            if (!shirt) throw { status: 400, message: 'Shirt not found' }

            return shirt;

        } catch (error) {
            throw error;
        };
    };

    async updateById(id, body) {
        try {
            const shirt = await this.collection.updateById(id, body);

            if (shirt.matchedCount === 0) throw { status: 400, message: 'Shirt not found' };

            return shirt;

        } catch (error) {
            throw error;
        };
    };

    async deleteById(id) {
        try {
            const shirt = await this.collection.deleteById(id);

            if (shirt.deletedCount === 0) throw { status: 400, message: 'Shirt not found' }

            return shirt;

        } catch (error) {
            throw error;
        };
    };

};

module.exports = Service;