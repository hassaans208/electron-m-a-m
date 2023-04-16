const { model } = require('../models/Customer')
const req = require('../../resources/request')
const store = (data) => {
    debugger 
    return model(req.post, data);
}
const get = async () => {
    const response = await model(req.get);
    return response;
}

module.exports.store = store
module.exports.get = get
