const Service = require('./specifications.service');

class Controller {

    async post(req, res) {
        try {
            const response = await new Service(req.app.locals.db).post(req.body);
            res.status(201).json(response);
        } catch (error) {
            console.log('error :>>', error)
            res.status(error.status).json(error);
        };
    };

};

module.exports = new Controller;