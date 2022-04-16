const ObjectId = require('mongodb').ObjectId;
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

            const shirtsCollection = new MongoCollection(this.database, 'shirts');

            const shirt = await shirtsCollection.findById(body.product);

            if (!shirt) throw { status: 400, message: "Product id in body doesn't exist." };

            if (model.available) {
                let quantities = [];

                const specifications = await this.collection.find({ product: model.product, deleted: false});

                specifications.map(specification => {
                    quantities.push(specification.quantity);
                });

                const quantity = quantities.reduce((x, y) => x + y);

                await shirtsCollection.updateById(body.product, { quantity: quantity });
            };

            const specification = await this.collection.insertOne(model);

            return specification;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Service;