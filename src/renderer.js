// authentication controller
const auth = require('./Controllers/AuthenticationController')
const main = require('./Controllers/DashboardController')
// const main = document.getElementById('main')
const usersForm = document.getElementById('usersForm')
const unmain = document.getElementById('unmain')
const mainDisplay = document.getElementById('mainDis')
const unmainDisplay = document.getElementById('unmainDis')

// authentication form submission 
const authForm = document.getElementById('authForm')
const authNotification = document.getElementById('auth')
const unlock = document.getElementById('unlock')

// main button data
const usersButton = document.getElementById('usersButton')
const companiesButton = document.getElementById('companiesButton')
const carsButton = document.getElementById('carsButton')
const customersButton = document.getElementById('customersButton')
const partsButton = document.getElementById('partsButton')
const billingsButton = document.getElementById('billingsButton')
const logout = document.getElementById('logout')
// ==========================
const isLoading = true

// main.addEventListener('click', (e) => {
//     // mainDisplay.style.display = 'block'
//     // unmainDisplay.style.display = 'none'
//     // console.log(window.fetch())

// });

// tab button handling
logout.addEventListener('click', (e) => {
    document.getElementById('auth').innerHTML = 'Not Logged In'
    unlock.classList = 'hidden'
    authForm.style.display = 'flex'
    document.getElementById('auth').style.color = 'black'
})
usersButton.addEventListener('click', (e) => {
    usersButton.classList = 'tab-item active'
    companiesButton.classList = 'tab-item'
    carsButton.classList = 'tab-item'
    customersButton.classList = 'tab-item'
    partsButton.classList = 'tab-item'
    billingsButton.classList = 'tab-item'
    main.usersButton()
})
companiesButton.addEventListener('click', (e) => {
    usersButton.classList = 'tab-item'
    companiesButton.classList = 'tab-item active'
    carsButton.classList = 'tab-item'
    customersButton.classList = 'tab-item'
    partsButton.classList = 'tab-item'
    billingsButton.classList = 'tab-item'
    main.companiesButton()
})
carsButton.addEventListener('click', (e) => {
    usersButton.classList = 'tab-item'
    companiesButton.classList = 'tab-item'
    carsButton.classList = 'tab-item active'
    customersButton.classList = 'tab-item'
    partsButton.classList = 'tab-item'
    billingsButton.classList = 'tab-item'
    main.carsButton()
})
customersButton.addEventListener('click', (e) => {
    usersButton.classList = 'tab-item'
    companiesButton.classList = 'tab-item'
    carsButton.classList = 'tab-item'
    customersButton.classList = 'tab-item active'
    partsButton.classList = 'tab-item'
    billingsButton.classList = 'tab-item'
    main.customersButton()
})
partsButton.addEventListener('click', (e) => {
    usersButton.classList = 'tab-item'
    companiesButton.classList = 'tab-item'
    carsButton.classList = 'tab-item'
    customersButton.classList = 'tab-item'
    partsButton.classList = 'tab-item active'
    billingsButton.classList = 'tab-item'
    main.partsButton()
})
billingsButton.addEventListener('click', (e) => {
    usersButton.classList = 'tab-item'
    companiesButton.classList = 'tab-item'
    carsButton.classList = 'tab-item'
    customersButton.classList = 'tab-item'
    partsButton.classList = 'tab-item'
    billingsButton.classList = 'tab-item active'
    main.billingsButton()
})
//==================================================
// unmain.addEventListener('click', async (e) => {
// const tableHeading = [
//     'name', 'email', 'password'
// ]
//     const response = await users.get()
//     console.log(response);
//     const table = document.createElement('table')
//     const thead = document.createElement('thead')
//     const tbody = document.createElement('tbody')
//     const tr = document.createElement('tr')
//     const trData = document.createElement('tr')
//     const td = document.createElement('td')
//     const th = document.createElement('th')
//     mainDisplay.appendChild(table)
//     table.appendChild(thead)
//     table.appendChild(tbody)
//     thead.appendChild(tr)
//     tr.appendChild(th)
//     th.innerText = "We are doing Well"
//     tbody.appendChild(trData)
//     trData.appendChild(td)
//     td.innerText = "We are doing Well!"
// });

// debugger
// usersForm.addEventListener('submit', (e) => {

//     e.preventDefault();
//     const name = document.getElementById('name').value
//     const password = document.getElementById('password').value
//     const phone_no = document.getElementById('phone_no').value
//     const email = document.getElementById('email').value
//     const status = document.getElementById('status').value
//     const type = document.getElementById('type').value
//     const info = document.getElementById('info')
//     console.log(info);
//     const data = {
//         name: name,
//         email: email,
//         phone: phone_no,
//         password: password,
//         type: type,
//         status: status,
//     }
//     console.log('process', data);
//     console.log(users.store(data))
//     document.getElementById('name').value = ''
//     document.getElementById('password').value = ''
//     document.getElementById('phone_no').value = ''
//     document.getElementById('email').value = ''
//     document.getElementById('info').innerHTML = '<p>User Created SuccessFully</p>'
//     debugger

// })
authForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const data = {
        email: email,
        password: password,
    }
    console.log('process', data);
    const response = await auth.login(data)
    if (response) {
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('auth').style.color = 'green'
        document.getElementById('auth').textContent = 'User Logged In'
        unlock.classList = 'flex-cols'
        authForm.style.display = 'none'
    } else {
        document.getElementById('auth').style.color = 'red'
        document.getElementById('auth').innerHTML = 'Incorrect Password or email'
    }
})


