const { Result } = require('postcss')
const { store, get } = require('../Controllers/CustomersController')
const action = require('../action.class')
const add = document.getElementById('add')
const view = document.getElementById('view')
const table = document.getElementById('table')
const form = document.getElementById('form')
const entryForm = document.getElementById('entryForm')
const info = document.getElementById('info')
const close = document.getElementById('close')
const infoBar = document.getElementById('infoBar')
const rows = document.getElementById('rows')

const name = document.getElementById('name')
const email = document.getElementById('email')
const phone_no = document.getElementById('phone_no')
const nic = document.getElementById('nic')
const address = document.getElementById('address')
const referal = document.getElementById('referal')


const customerAction = action
// console.log(customerAction);

let response;
let object = [];
const getData = async () => {
    response = await get();
    // console.log(response);
    rows.innerHTML = ''

    if (response?.length) {
        response.forEach(element => {
            console.log(element.email);
            let tr = document.createElement('tr')
            tr.innerHTML =
                `
                <td>${element?.id}</td>
        <td>${element?.name}</td>
        <td>${element.email}</td>
        <td>${element?.phone}</td>
        <td>${element?.cnic}</td>
        <td>${element?.address}</td>
        <td>${element?.referal}</td>
        <td>
        <form id="deleteEntry">
            <input type="text" value="${element?.id}" id="deleteValue">
            <input type="submit" value="View" class="btn btn-primary">
        </form>
          <button id="view${element?.id}" class="btn btn-primary">
          
            <span class="icon icon-vcard"></span>
            </button>
            <button id="edit${element?.id}" class="btn btn-default">
            <span class="icon icon-pencil"></span>
            </button>
            <button id="delete${element?.id}" class="btn btn-negative">
            <span class="icon icon-trash"></span>
          </button>
        </td>`
            rows.appendChild(tr)
            // let view = `view${element?.id}`;
            eval(`const view${element?.id}= ()=>{
                return 'some'
            }`)
            customerAction.configDelete(`view${element?.id}`)
            // console.log(some1);
        });
        console.log(customerAction);
        // console.log(object);
    }
}
getData()


close.addEventListener('click', (e) => {
    infoBar.classList = 'hidden'
    info.textContent = ''
})
add.addEventListener('click', (e) => {
    form.classList = 'visible'
    table.classList = 'hidden'
    info.textContent = ''
})
view.addEventListener('click', (e) => {
    form.classList = 'hidden'
    table.classList = 'visible'
    info.textContent = ''
})

entryForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!name.value
        || !email.value
        || !phone_no.value
        || !nic.value
        || !address.value
        || !referal.value) {
        infoBar.classList = 'flex'
        info.textContent = "Data Could Not Be Null"
        return
    }
    const data = {
        name: name.value,
        email: email.value,
        phone: phone_no.value,
        cnic: nic.value,
        address: address.value,
        referal: referal.value,
    }
    console.log(store(data));
    name.value = ''
    email.value = ''
    phone_no.value = ''
    nic.value = ''
    address.value = ''
    referal.value = ''
    infoBar.classList = 'flex'
    info.textContent = "Customer Added Successfully"
    form.classList = 'hidden'
    table.classList = 'visible'
    getData()

})
