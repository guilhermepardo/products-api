const { MongoClient } = require('mongodb');

class Connect {
    constructor(uri) {
        this.client = new MongoClient(uri);
    };

    async connect() {
        try {
            await this.client.connect();
            console.log('Sucessfully connected to MongoDB.');
        } catch (error) {
            throw error;
        };
    };

    async close() {
        try {
            await this.client.close();
            console.log('Session closed.')
        } catch (error) {
            throw error;
        };
    };

    async database(databaseName) {
        try {
            const database = this.client.db(databaseName);
            console.log('Sucessfully connected to database.');
            return database;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Connect;