const { ipcRenderer } = require('electron')

const usersButton = () => {
    ipcRenderer.send('usersButton', 'open')
}
const carsButton = () => {
    ipcRenderer.send('carsButton', 'open')
}
const companiesButton = () => {
    ipcRenderer.send('companiesButton', 'open')
}
const customersButton = () => {
    ipcRenderer.send('customersButton', 'open')
}
const partsButton = () => {
    ipcRenderer.send('partsButton', 'open')
}
const billingsButton = () => {
    ipcRenderer.send('billingsButton', 'open')
}


module.exports.usersButton = usersButton
module.exports.carsButton = carsButton
module.exports.companiesButton = companiesButton
module.exports.customersButton = customersButton
module.exports.partsButton = partsButton
module.exports.billingsButton = billingsButton