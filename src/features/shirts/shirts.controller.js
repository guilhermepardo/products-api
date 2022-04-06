const Service = require('./shirts.service');

class Controller {

    async post(req, res) {
        try {
            const response = await new Service(req.app.locals.db).post(req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(error.status).json(error);
        };
    };

    async get(req, res) {
        try {
            const response = await new Service(req.app.locals.db).get();
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error);
        };
    };

    async getById(req, res) {
        try {
            const response = await new Service(req.app.locals.db).getById(req.params.id);
            res.json(response)
        } catch (error) {
            res.status(error.status).json(error);
        };
    };

    async updateById(req, res) {
        try {
            await new Service(req.app.locals.db).updateById(req.params.id, req.body);
            res.status(204).json(null);
        } catch (error) {
            res.status(error.status).json(error);
        };
    };

    async deleteById(req, res) {
        try {
            await new Service(req.app.locals.db).deleteById(req.params.id);
            res.status(204).json(null);
        } catch (error) {
            res.status(error.status).json(error);
        };
    };

};

module.exports = new Controller;