const ObjectId = require('mongodb').ObjectId;
const MongoCollection = require('../../helpers/mongodb/collection.helper');
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

            const specification = await this.collection.insertOne(model);

            if (model.available) {
                let quantities = [];

                const specifications = await this.collection.find({ product: model.product, available: true });

                let quantity = 0;

                if (specifications.length > 0) {
                    specifications.map(specification => {
                        quantities.push(specification.quantity);
                    });

                    quantity = quantities.reduce((x, y) => x + y);

                    await shirtsCollection.updateById(body.product, { quantity: quantity, available: quantity > 0 ? true : false });
                };
            };

            return specification;
        } catch (error) {
            throw error;
        };
    };

    async get() {
        try {
            const specifications = await this.collection.find();

            return specifications;
        } catch (error) {
            throw error;
        };
    };

    async getById(id) {
        try {
            const specification = await this.collection.findById(id);

            if (!specification) throw { status: 400, message: 'Specification not found' };

            return specification;
        } catch (error) {
            throw error;
        };
    };

    async updateById(id, body) {
        try {
            body.updatedAt = new Date().toISOString();

            const specification = await this.collection.findById(id);

            if (!specification) throw { status: 400, message: 'Specification not found' };

            if (body.hasOwnProperty('available')) throw { status: 400, message: 'Specification availability cannot be changed in body.' };

            if (body.hasOwnProperty('quantity')) {
                const shirtsCollection = new MongoCollection(this.database, 'shirts');

                let quantities = [];

                if (body.quantity === 0 || body.quantity < 1) {
                    body.available = false;
                } else {
                    body.available = true;
                };

                const specificationUpdate = await this.collection.updateById(id, body);

                const specifications = await this.collection.find({ product: specification.product, available: true });

                let quantity = 0;

                if (specifications.length > 0) {
                    specifications.map(specificationIndex => {
                        quantities.push(specificationIndex.quantity);
                    });
                    quantity = quantities.reduce((x, y) => x + y);
                };

                await shirtsCollection.updateOne({ _id: specification.product }, { quantity: quantity, available: quantity > 0 ? true : false });

                return specificationUpdate;
            };

            const specificationUpdate = await this.collection.updateById(id, body);

            return specificationUpdate;
        } catch (error) {
            throw error;
        };
    };

    async deleteById(id) {
        try {
            const specification = await this.collection.findById(id);

            if (!specification) throw { status: 400, message: 'Specification not found' };

            const deleteSpecification = await this.collection.logicalDeleteById(id);

            const shirtsCollection = new MongoCollection(this.database, 'shirts');

            let quantities = [];

            const specifications = await this.collection.find({ product: specification.product, available: true });

            let quantity = 0;

            if (specifications.length > 0) {
                specifications.map(specification => {
                    quantities.push(specification.quantity);
                });
                quantity = quantities.reduce((x, y) => x + y);
            };

            await shirtsCollection.updateOne({ _id: specification.product }, { quantity: quantity, available: quantity > 0 ? true : false });

            return deleteSpecification;
        } catch (error) {
            throw error;
        };
    };

    async getShirtSpecifications(id) {
        try {
            const specifications = await this.collection.find({ _id: new ObjectId(id) });

            return specifications;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Service;