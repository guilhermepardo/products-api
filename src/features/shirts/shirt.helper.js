class Helper {

    validation(body) {
        try {
            if (!body || body === {}) throw { status: 400, message: 'No body sent to post.' };
            if (!body.hasOwnProperty('name') || typeof body.name != 'string') throw { status: 400, message: 'Property name must be a string.' };
            if (!body.hasOwnProperty('sizes') || !Array.isArray(body.sizes)) throw { status: 400, message: 'Property sizes must be an array' };

            body.sizes.map(size => {
                try {
                    if (!size.hasOwnProperty('size') || typeof size.size != 'string') throw { status: 400, message: 'Property size must be a string.' };
                    if (!size.hasOwnProperty('available') || typeof size.available != 'boolean') throw { status: 400, message: 'Property available must be a boolean.' };
                    if (!size.hasOwnProperty('quantity') || typeof size.quantity != 'number') throw { status: 400, message: 'Property quantity must be a number.' };
                } catch (error) {
                    throw error;
                }
            });

            if (!body.hasOwnProperty('price') || typeof body.price != 'number') throw { status: 400, message: 'Property price must be a number.' };
            if (!body.hasOwnProperty('images') || !Array.isArray(body.images)) throw { status: 400, message: 'Property images must be an array' };

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

            let quantities = [];
            let quantity;

            body.sizes.map(size => {
                quantities.push(size.quantity);
            });

            quantity = quantities.reduce((x, y) => x + y);

            body.quantity = quantity;
            body.deleted = false;
            body.isActive = false;
            body.createdAt = new Date().toISOString();
            body.updatedAt = new Date().toISOString();

            return body;
        } catch (error) {
            throw error;
        };
    };

};

module.exports = Helper;