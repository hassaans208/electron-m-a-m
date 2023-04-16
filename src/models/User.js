const bcrypt = require('bcrypt');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/db.sqlite');
const { salt } = require('../database/salt')

// validate Request
const validateRequest = (name, phone, email, password) => {
    let field = [name, phone, email, password];
    let errors;
    if (!name || !phone || !email || !password) {
        field.forEach(element => {
            if (!element) {
                errors.push(element + 'is required')
            }
        })
        return [
            false,
            errors
        ]
    }
    return [
        true,
        'Validated Request',
        field
    ]

}
// fetch one user
const fetchOneUser = async (data) => {
    const $id = data.id;
    db.run("SELECT * FROM Users WHERE id",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}

// fetch all users
const allUsers = async () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Users", (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
            console.log(rows);
        });
    })
}
// create a user
const insertUser = (data) => {

    // const validation = validateRequest(data.name, data.phone, data.email, data.password)
    const validation = true
    console.log('not reached', validation);
    debugger
    if (validation) {

        const hash = bcrypt.hashSync(data.password, salt);
        const $name = data.name;
        const $phone = data.phone;
        const $email = data.email;
        const $type = 2;
        const $password = hash
        console.log('reached', data);

        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("INSERT INTO Users (name, phone, email, type, password) VALUES (?,?,?,?,?)",
            [$name, $phone, $email, $type, $password],
            (err, res) => {
                if (err) console.log(err)
                if (res) console.log(res)
            })
        debugger
        return true
    } else {
        return validation
    }
}
// update a user
const updateUser = (data) => {

    const validation = validateRequest(data.name, data.phone, data.email, data.password)

    if (validation) {
        const salt = `$2b$10$SxGc/sPjYDyxDWU0K0QsRO`;

        const hash = bcrypt.hashSync(data.password, salt);
        const $id = data.id;
        const $name = data.name;
        const $phone = data.phone;
        const $email = data.email;
        const $type = 2;
        const $password = hash

        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("UPDATE Users SET (name, phone, email, type, password) VALUES (?,?,?,?,?) WHERE id = ?",
            [$name, $phone, $email, $type, $password, $id],
            (err, res) => {
                if (err) console.log(err)
                if (res) console.log(res)
            })
        return true;
    } else {
        return validation
    }
}
// delete a user
const deleteUser = (data) => {

    const $id = data.id

    db.run("Delete * From Users Where id = ?",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
    return true

}


// request executer to make process easy and concise
const executeRequest = async (request, data = null) => {
    if (request === 'SELECT') {
        return await fetchOneUser(data)
    }
    else if (request === 'GET') {
        return await allUsers()
    }
    else if (request === 'POST') {
        return insertUser(data)
    }
    else if (request === 'PUT') {
        return updateUser(data)
    }
    else if (request === 'DELETE') {
        return deleteUser(data);
    }
}

module.exports.model = executeRequest