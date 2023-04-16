const bcrypt = require('bcrypt');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/db.sqlite');


const custormerHasCars = (data) => {

    // const validation = validateRequest(data.job_no, data.estimate_, data.email, data.password)
    const validation = true

    if (validation) {

        const $customer_id = data.customer_id;
        const $cars_id = data.cars_id;

        // console.log({$customer_id, $email, $password, $type, $cars_id}); // This is the hashed password

        db.run("INSERT INTO CustomerHasCars (customer_id, cars_id) VALUES (?,?)",
            [$customer_id, $cars_id],
            (err, res) => {
                if (err) console.log(err)
                if (res) console.log(res)
            })
        return true
    } else {
        return validation
    }
}
const billHasParts = (data) => {

    // const validation = validateRequest(data.job_no, data.estimate_, data.email, data.password)
    const validation = true

    if (validation) {

        const $bill_id = data.bill_id;
        const $part_id = data.part_id;

        // console.log({$bill_id, $email, $password, $type, $part_id}); // This is the hashed password

        db.run("INSERT INTO BillHasParts (bill_id, part_id) VALUES (?,?)",
            [$bill_id, $part_id],
            (err, res) => {
                if (err) console.log(err)
                if (res) console.log(res)
            })
        return true
    } else {
        return validation
    }
}


// request executer to make process easy and concise
const executeRequest = async (request, data = null) => {
    if (request === 'CUSTOMER') {
        return await custormerHasCars(data)
    }
    else if (request === 'BILL') {
        return await billHasParts(data)
    }
}

module.exports.model = executeRequest