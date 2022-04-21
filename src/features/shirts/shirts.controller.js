const Service = require('./shirts.service');

class Controller {

    async post(req, res) {
        try {
            const response = await new Service(req.app.locals.db).post(req.body);
            res.status(201).json(response);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            } else {
                res.sendStatus(500);
            };
        };
    };

    async get(req, res) {
        try {
            const response = await new Service(req.app.locals.db).get();
            res.json(response);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            } else {
                res.sendStatus(500);
            };
        };
    };

    async getById(req, res) {
        try {
            const response = await new Service(req.app.locals.db).getById(req.params.id);
            res.json(response)
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            } else {
                res.sendStatus(500);
            };
        };
    };

    async updateById(req, res) {
        try {
            await new Service(req.app.locals.db).updateById(req.params.id, req.body);
            res.status(204).json(null);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            } else {
                res.sendStatus(500);
            };
        };
    };

    async deleteById(req, res) {
        try {
            await new Service(req.app.locals.db).deleteById(req.params.id);
            res.status(204).json(null);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            } else {
                res.sendStatus(500);
            };
        };
    };

    async getShirtSpecifications(req, res) {
        try {
            const response = await new Service(req.app.locals.db).getShirtSpecifications(req.params.id);
            res.json(response)
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            } else {
                res.sendStatus(500);
            };
        };
    };

};

module.exports = new Controller;