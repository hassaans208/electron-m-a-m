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
    db.run("SELECT * FROM Bill WHERE id",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}

// fetch all users
const all = async () => {

    db.run("SELECT * FROM Bill",
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

        const $job_no = data.job_no;
        const $estimate_no = data.estimate_no;
        const $bill_no = data.bill_no;
        const $total_bill = data.total_bill;
        const $no_of_parts = data.no_of_parts;
        const $car_id = data.car_id;

        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("INSERT INTO Bill (job_no, estimate_no, bill_no, total_bill, no_of_parts, car_id) VALUES (?,?,?,?,?,?)",
            [$job_no, $estimate_no, $bill_no, $total_bill, $no_of_parts, $car_id],
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
        const $job_no = data.job_no;
        const $estimate_no = data.estimate_no;
        const $bill_no = data.bill_no;
        const $total_bill = data.total_bill;
        const $no_of_parts = data.no_of_parts;
        const $car_id = data.car_id;

        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("UPDATE Bill SET (job_no, estimate_no, bill_no, total_bill, no_of_parts, car_id) SET (?,?,?,?,?,?) WHERE id = ?",
            [$job_no, $estimate_no, $bill_no, $total_bill, $no_of_parts, $car_id],
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

    db.run("Delete * From Bill Where id = ?",
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