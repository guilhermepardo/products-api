const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res, next) => {
    try {
        if (req.params.id) {
            const isValid = ObjectId.isValid(req.params.id);
            if (!isValid) throw { status: 400, message: 'Invalid ObjectId' };
        };
        return next();
    } catch (error) {
        res.status(error.status).json(error);
    };
};