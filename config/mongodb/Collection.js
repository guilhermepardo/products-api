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
            query.deleted = false;
            const find = await this.collection.find(query).toArray();
            return find;
        } catch (error) {
            throw error;
        };
    };

    async findById(id) {
        try {
            const findById = await this.collection.findOne({ _id: new ObjectId(id), deleted: false });
            return findById;
        } catch (error) {
            throw error;
        };
    };

    async findOne(query) {
        try {
            query.deleted = false;
            const findOne = await this.collection.findOne(query);
            return findOne;
        } catch (error) {
            throw error;
        };
    };

    async updateById(id, doc) {
        try {
            const updateById = await this.collection.updateOne({
                _id: new ObjectId(id),
                deleted: false
            },
                { $set: doc });
            return updateById;
        } catch (error) {
            throw error;
        };
    };

    async updateOne(query, doc) {
        try {
            query.deleted = false;
            const updateOne = await this.collection.updateOne(query,
                { $set: doc });
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

    async logicalDeleteById(id) {
        try {
            const logicalDeleteById = await this.collection.updateOne({
                _id: new ObjectId(id),
                deleted: false
            },
                {
                    $set: { deleted: true }
                });
            return logicalDeleteById;
        } catch (error) {
            throw error;
        };
    };

    async logicalDeleteOne(query) {
        try {
            query.deleted = false;
            const logicalDeleteOne = await this.collection.updateOne(query, { $set: { deleted: true } });
            return logicalDeleteOne;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Collection;