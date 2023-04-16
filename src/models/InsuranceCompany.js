const bcrypt = require('bcrypt');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/db.sqlite');

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
const fetchOne = async (data) => {
    const $id = data.id;
    db.run("SELECT * FROM InsuranseCompanies WHERE id",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}

// fetch all users
const all = async () => {

    db.run("SELECT * FROM InsuranseCompanies",
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}
// create a user
const insert = (data) => {

    // const validation = validateRequest(data.job_no, data.estimate_, data.email, data.password)
    const validation = true

    if (validation) {

        const $name = data.name;
        const $phone = data.phone;
        const $email = data.email;
        const $address = data.address;
        const $status = data.status;

        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("INSERT INTO InsuranseCompanies (name, phone, email, address, status) VALUES (?,?,?,?,?,?)",
            [$name, $phone, $email, $address, $status],
            (err, res) => {
                if (err) console.log(err)
                if (res) console.log(res)
            })
        return true
    } else {
        return validation
    }
}
// update a user
const update = (data) => {

    const validation = true
    // const validation = validateRequest(data.name, data.phone, data.email, data.password)

    if (validation) {

        const $id = data.id;
        const $name = data.name;
        const $phone = data.phone;
        const $email = data.email;
        const $address = data.address;
        const $status = data.status;
        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("UPDATE InsuranseCompanies SET (name, phone, email, address, status) SET (?,?,?,?,?,?) WHERE id = ?",
        [$name, $phone, $email, $address, $status,  $id],
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
const destroy = (data) => {

    const $id = data.id

    db.run("Delete * From InsuranseCompanies Where id = ?",
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
        return await fetchOne(data)
    }
    else if (request === 'GET') {
        return await all()
    }
    else if (request === 'POST') {
        return insert(data)
    }
    else if (request === 'PUT') {
        return update(data)
    }
    else if (request === 'DELETE') {
        return destroy(data);
    }
}

module.exports.model = executeRequest