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
    db.run("SELECT * FROM Customers WHERE id",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}

// fetch all users
const all = async () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Costumers", (err, rows) => {
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
const insert = (data) => {

    // const validation = validateRequest(data.job_no, data.estimate_, data.email, data.password)
    const validation = true

    if (validation) {

        const $name = data.name;
        const $phone = data.phone;
        const $email = data.email;
        const $cnic = data.cnic;
        const $address = data.address;
        const $referal = data.referal;
        debugger
        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("INSERT INTO Costumers (name, phone, email, cnic, address, referal) VALUES (?,?,?,?,?,?)",
            [$name, $phone, $email, $cnic, $address, $referal],
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
        const $cnic = data.cnic;
        const $address = data.address;
        const $referal = data.referal;
        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("UPDATE Customers SET (name, phone, email, cnic, address, referal) SET (?,?,?,?,?,?) WHERE id = ?",
            [$name, $phone, $email, $cnic, $address, $referal, $id],
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

    db.run("Delete * From Customers Where id = ?",
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
        debugger
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