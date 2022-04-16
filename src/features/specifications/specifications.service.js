const MongoCollection = require('../../../config/mongodb/Collection');
const Helper = require('./specifications.helper');
class Service {
    constructor(database) {
        this.database = database;
        this.collection = new MongoCollection(this.database, 'specifications');
        this.helper = new Helper;
    };

    async post(body) {
        try {
            const model = this.helper.model(body);

            const shirtsService = new MongoCollection(this.database, 'shirts');

            const shirt = await shirtsService.findById(body.product);

            if (!shirt) throw { status: 400, message: "Product id in body doesn't exist." };

            if (model.available) await shirtsService.updateById(body.product, { quantity: model.quantity });

            const specification = await this.collection.insertOne(model);

            return specification;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Service;