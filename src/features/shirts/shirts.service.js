
class Service {
    constructor(database) {
        this.collection = database.collection('shirts')
    }
    async get() {
        try {

            const shirts = await this.collection.find({}).toArray();

            return shirts;

        } catch (error) {
            throw error;
        };
    };

};

module.exports = Service;