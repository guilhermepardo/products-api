const service = require('./shirts.service');

class Controller {

    async get(req, res) {
        console.log('db :>>', req.app.locals.db)
        try {
            const response = await new service(req.app.locals.db).get();
            res.send(response)
        } catch (error) {
            throw error;
        };
    };

};

module.exports = new Controller;