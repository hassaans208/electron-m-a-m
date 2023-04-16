const add = document.getElementById('add')
const view = document.getElementById('view')
const table = document.getElementById('table')
const form = document.getElementById('form')
const info = document.getElementById('info')

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