const ObjectId = require('mongodb').ObjectId;
const MongoCollection = require('../../helpers/mongodb/collection.helper');
const Helper = require('./shirt.helper');
class Service {
    constructor(database) {
        this.database = database;
        this.collection = new MongoCollection(this.database, 'shirts');
        this.helper = new Helper;
    };

    async post(body) {
        try {
            const model = this.helper.model(body);

            const shirt = await this.collection.insertOne(model);

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

            if (!shirt) throw { status: 400, message: 'Shirt not found' };

            return shirt;
        } catch (error) {
            throw error;
        };
    };

    async updateById(id, body) {
        try {
            body.updatedAt = new Date().toISOString();

            const shirt = await this.collection.updateById(id, body);

            if (shirt.matchedCount === 0) throw { status: 400, message: 'Shirt not found' };

            return shirt;
        } catch (error) {
            throw error;
        };
    };

    async deleteById(id) {
        try {
            const shirt = await this.collection.logicalDeleteById(id);

            if (shirt.matchedCount === 0) throw { status: 400, message: 'Shirt not found' };

            const specificationsCollection = new MongoCollection(this.database, 'specifications');

            const specifications = await specificationsCollection.find({ product: new ObjectId(id) });

            if (specifications.length > 0) {
                for (const specification of specifications) {
                    await specificationsCollection.logicalDeleteById(specification._id);
                };
            };

            return shirt;
        } catch (error) {
            throw error;
        };
    };

    async getShirtSpecifications(id) {
        try {
            const shirt = await this.collection.findById(id);

            if (!shirt) throw { status: 400, message: 'Shirt not found' };

            const specificationsCollection = new MongoCollection(this.database, 'specifications');

            const specifications = await specificationsCollection.find({ product: new ObjectId(id) });

            shirt.specifications = specifications;

            return shirt;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Service;