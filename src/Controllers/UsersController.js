const { model } = require('../models/User')
const req = require('../../resources/request')
const store = (data) => {
    console.log('controller', data);
    debugger
    return model(req.post, data);
}
const get = async () => {
    console.log('controller');
    response = await model(req.get);
    return response;
}

module.exports.store = store
module.exports.get = get
