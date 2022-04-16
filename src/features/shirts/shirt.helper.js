const ObjectId = require('mongodb').ObjectId;

class Helper {

    validObjectId(id) {
        try {
            const isValid = ObjectId.isValid(id);
            if (!isValid) throw { status: 400, message: "Invalid ObjectId." }
            return isValid;
        } catch (error) {
            throw error;
        }
    }

    validation(body) {
        try {

            if (!body || body === {}) throw { status: 400, message: 'No body sent to post.' };
            if (!body.hasOwnProperty('name') || typeof body.name != 'string') throw { status: 400, message: 'Property name must be a string.' };
            if (!body.hasOwnProperty('basic') || typeof body.basic != 'boolean') throw { status: 400, message: 'Property basic must be a boolean.' };
            if (!body.hasOwnProperty('price') || typeof body.price != 'number') throw { status: 400, message: 'Property price must be a number.' };
            if (!body.hasOwnProperty('images') || !Array.isArray(body.images)) throw { status: 400, message: 'Property images must be an array.' };

            body.images.map(image => {
                try {
                    if (!image.hasOwnProperty('url') || typeof image.url != 'string') throw { status: 400, message: 'Property url must be a string.' };
                } catch (error) {
                    throw error;
                };
            });

        } catch (error) {
            throw error;
        };
    };

    model(body) {
        try {
            this.validation(body);

            body.available = body.available ? body.available : false; 
            body.quantity = 0;
            body.deleted = false;
            body.isActive = body.isActive ? body.isActive : false;
            body.createdAt = new Date().toISOString();
            body.updatedAt = new Date().toISOString();

            return body;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Helper;