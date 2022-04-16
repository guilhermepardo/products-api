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
            if (!body.hasOwnProperty('color') || typeof body.color != 'string') throw { status: 400, message: 'Property color must be a string.' };
            if (!body.hasOwnProperty('size') || typeof body.size != 'string') throw { status: 400, message: 'Property size must be a string.' };
            if (!body.hasOwnProperty('quantity') || typeof body.quantity != 'number') throw { status: 400, message: 'Property quantity must be a number.' };
            if (!body.hasOwnProperty('images') || !Array.isArray(body.images)) throw { status: 400, message: 'Property images must be an array' };

            body.images.map(image => {
                try {
                    if (!image.hasOwnProperty('url') || typeof image.url != 'string') throw { status: 400, message: 'Property url must be a string.' };
                } catch (error) {
                    throw error;
                };
            });

            if (!body.hasOwnProperty('product')) throw { status: 400, message: 'Missing product id.' };

            this.validObjectId(body.product);

        } catch (error) {
            throw error;
        };
    };

    model(body) {
        try {
            this.validation(body);

            body.available = body.available ? body.available : false;
            body.product = new ObjectId(body.product);
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