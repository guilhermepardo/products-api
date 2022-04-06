const Service = require('./shirts.service');

class Controller {

    async post(req, res) {
        try {
            const response = await new Service(req.app.locals.db).post(req.body);
            console.log('response :>>', response);
            res.sendStatus(201).send(response);
            // res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        };
    };

    async get(req, res) {
        try {
            const response = await new Service(req.app.locals.db).get();
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        };
    };

    async getById(req, res) {
        try {
            const response = await new Service(req.app.locals.db).getById(req.params.id);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        };
    };

    async updateById(req, res) {
        try {
            const response = await new Service(req.app.locals.db).updateById(req.params.id, req.body);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        };
    };

    async deleteById(req, res) {
        try {
            const response = await new Service(req.app.locals.db).deleteById(req.params.id);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        };
    };

};

module.exports = new Controller;