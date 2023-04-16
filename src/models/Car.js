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
    db.run("SELECT * FROM Cars WHERE id",
        [$id],
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
}

// fetch all users
const all = async () => {

   return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Cars", (err, rows) => {
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

        const $model = data.model;
        const $company = data.company;
        const $number = data.number;
        const $color = data.color;
        const $date_entered = data.date_entered;
        const $date_exited = data.date_exited;
        const $status = data.status;

        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("INSERT INTO Cars (model, company, number, color, date_entered, date_exited, status) VALUES (?,?,?,?,?,?)",
            [$model, $company, $number, $color, $date_entered, $date_exited, $status],
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
        const $model = data.model;
        const $company = data.company;
        const $number = data.number;
        const $color = data.color;
        const $date_entered = data.date_entered;
        const $date_exited = data.date_exited;
        const $status = data.status;
        // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

        db.run("UPDATE Cars SET (model, company, number, color, date_entered, date_exited, $status) SET (?,?,?,?,?,?) WHERE id = ?",
        [$model, $company, $number, $color, $date_entered, $date_exited, $status, $id],
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

    db.run("Delete * From Cars Where id = ?",
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