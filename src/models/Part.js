const bcrypt = require('bcrypt');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/db.sqlite');

// validate Request
const validateRequest = (parts, cost, job_no, password) => {
    let field = [parts, cost, job_no, password];
    let errors;
    if (!parts || !cost || !job_no || !password) {
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
    db.run("SELECT * FROM PartReport WHERE id",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}

// fetch all users
const all = async () => {

    db.run("SELECT * FROM PartReport",
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}
// create a user
const insert = (data) => {

    // const validation = validateRequest(data.job_no, data.estimate_, data.job_no, data.password)
    const validation = true

    if (validation) {

        const $parts = data.parts;
        const $cost = data.cost;
        const $job_no = data.job_no;
        const $estimate_no = data.estimate_no;
        const $car_id = data.car_id;

        // console.log({$parts, $job_no, $password, $type, $cost}); // This is the hashed password

        db.run("INSERT INTO PartReport (parts, cost, job_no, estimate_no, car_id) VALUES (?,?,?,?,?,?)",
            [$parts, $cost, $job_no, $estimate_no, $car_id],
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
    // const validation = validateRequest(data.parts, data.cost, data.job_no, data.password)

    if (validation) {

        const $id = data.id;
        const $parts = data.parts;
        const $cost = data.cost;
        const $job_no = data.job_no;
        const $estimate_no = data.estimate_no;
        const $car_id = data.car_id;
        // console.log({$parts, $job_no, $password, $type, $cost}); // This is the hashed password

        db.run("UPDATE PartReport SET (parts, cost, job_no, estimate_no, car_id) SET (?,?,?,?,?,?) WHERE id = ?",
            [$parts, $cost, $job_no, $estimate_no, $car_id, $id],
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

    db.run("Delete * From PartReport Where id = ?",
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