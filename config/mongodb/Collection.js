class Collection {
    constructor(database, collection) {
        console.log('database Collection :>>', database);
        console.log('collection Collection :>>', collection);
        this.database = database;
        this.collection = collection;
    };

    async collectionSetup() {
        try {
            console.log('BATEU AQUI NO COL SETUP!!!');
            const collection = this.database.collection(this.collection);
            return collection;
        } catch (error) {
            throw error;
        };
    };

    async find(query) {
        try {
            console.log('BATEU AQUI no FIND');
            const collection = this.collectionSetup();
            const response = collection.find(query).toArray();
            return response;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Collection;