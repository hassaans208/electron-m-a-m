const { model } = require('../models/User')
const req = require('../../resources/request');
const { ipcRenderer } = require('electron')

const login = async (data) => {
    const response = await model(req.get);

    let loginCreds = null;

    response.forEach(element => {
        if (element.email == data.email) {
            loginCreds = element
        }
    });

    if (loginCreds) {

        ipcRenderer.send('login', loginCreds)
        ipcRenderer.on('user-login', (e, d) => {
            console.log(d);
        })

        return true

    } else {

        return false

    }
}

module.exports.login = login