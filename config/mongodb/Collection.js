const { ObjectId } = require('mongodb');

class Collection {
    constructor(database, collection) {
        this.collection = database.collection(collection);
    };

    async insertOne(doc) {
        try {
            const insertOne = await this.collection.insertOne(doc);
            return { _id: insertOne.insertedId };
        } catch (error) {
            throw error;
        };
    };

    async find(query = {}) {
        try {
            const find = await this.collection.find(query).toArray();
            return find;
        } catch (error) {
            throw error;
        };
    };

    async findById(id) {
        try {
            const findById = await this.collection.findOne({ _id: new ObjectId(id) });
            return findById;
        } catch (error) {
            throw error;
        };
    };

    async findOne(query) {
        try {
            const findOne = await this.collection.findOne(query);
            return findOne;
        } catch (error) {
            throw error;
        };
    };

    async updateById(id, doc) {
        try {
            const updateById = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: doc });
            return updateById;
        } catch (error) {
            throw error;
        };
    };

    async updateOne(query) {
        try {
            const updateOne = await this.collection.updateOne(query, { $set: doc });
            return updateOne;
        } catch (error) {
            throw error;
        };
    };

    async deleteById(id) {
        try {
            const deleteById = await this.collection.deleteOne({ _id: new ObjectId(id) });
            return deleteById;
        } catch (error) {
            throw error;
        };
    };

    async deleteOne(query) {
        try {
            const deleteOne = await this.collection.deleteOne(query);
            return deleteOne;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Collection;