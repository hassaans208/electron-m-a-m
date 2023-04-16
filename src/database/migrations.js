const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/db.sqlite');
const bcrypt = require('bcrypt');

const password = 'password';
const salt = `$2b$10$SxGc/sPjYDyxDWU0K0QsRO`;

// Hash the password with the salt

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Users");
    db.run("DROP TABLE IF EXISTS InsuranseCompanies");
    db.run("DROP TABLE IF EXISTS Cars");
    db.run("DROP TABLE IF EXISTS Costumers");
    db.run("DROP TABLE IF EXISTS CostumerHasCars");
    db.run("DROP TABLE IF EXISTS PartReport");
    db.run("DROP TABLE IF EXISTS Bill");
    db.run("DROP TABLE IF EXISTS BillHasParts");

    db.run(`Create Table Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NULL,
        phone VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        type INTEGER NULL,
        password VARCHAR(255) NULL,
        status VARCHAR(255) NULL
    )`, (err, res) => {
        if (err) console.log(err)
        if (res) console.log(res)
    });

    db.run(`Create Table InsuranseCompanies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NULL,
        phone VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        address VARCHAR(255) NULL,
        status INTEGER NULL
    )`, (err, res) => {
        if (err) console.log(err)
        if (res) console.log(res)
    });

    db.run(`Create Table Cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        model VARCHAR(255) NULL,
        company VARCHAR(255) NULL,
        number VARCHAR(255) NULL,
        color VARCHAR(255) NULL,
        date_entered VARCHAR(255) NULL,
        date_exited VARCHAR(255) NULL,
        status INTEGER NULL
    )`, (err, res) => {
        if (err) console.log(err)
        if (res) console.log(res)
    });
    db.run(`Create Table Costumers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NULL,
        phone VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        cnic VARCHAR(255) NULL,
        address VARCHAR(255) NULL,
        referal VARCHAR(255) NULL
    )`, (err, res) => {
        if (err) console.log(err)
        if (res) console.log(res)
    });
    db.run(`Create Table CostumerHasCars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NULL,
        cars_id INTEGER NULL,
        FOREIGN KEY (id) REFERENCES Cars(cars_id),
        FOREIGN KEY (id) REFERENCES Costumers(customer_id)
    
    )`, (err, res) => {
        if (err) console.log(err)
        if (res) console.log(res)
    });
// console.log('Some');
    db.run(`Create Table PartReport (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parts VARCHAR(255) NULL,
        cost INTEGER NULL,
        job_no INTEGER NULL,
        estimate_no INTEGER NULL,
        car_id INTEGER NULL,
        FOREIGN KEY (id) REFERENCES Cars(car_id)
    )`, (err, res) => {
        if (err) console.log('PartReport',err)
        if (res) console.log(res)
    });
    db.run(`Create Table Bill (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_no INTEGER NULL,
        estimate_no INTEGER NULL,
        bill_no INTEGER NULL UNIQUE,
        total_bill BLOB NULL,
        no_of_parts INTEGER NULL,
        car_id INTEGER NULL,
        status INTEGER NULL,
        FOREIGN KEY (id) REFERENCES Cars(car_id)
    )`, (err, res) => {
        if (err) console.log('Bill',err)
        if (res) console.log(res)
    });
    db.run(`Create Table BillHasParts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bill_id INTEGER NULL,
        part_id INTEGER NULL,
        FOREIGN KEY (id) REFERENCES PartReport(part_id),
        FOREIGN KEY (id) REFERENCES Bill(bill_id)
    )`, (err, res) => {
        if (err) console.log('BillHasParts', err)
        if (res) console.log(res)
    });

    const hash = bcrypt.hashSync(password, salt);
    const $name = "MirzaAutos";
    const $phone = '123456';
    const $email = "shariqmpk@gmail.com";
    const $type = 1;
    const $password = hash

    // console.log({$name, $email, $password, $type, $phone}); // This is the hashed password

    db.run("INSERT INTO Users (name, phone, email, type, password) VALUES (?,?,?,?,?)",
    [$name, $phone, $email, $type, $password] ,
        (err, res) => {
            if (err) console.log(err)
            if (res) console.log(res)
        })
})

console.log('Migrated Successfully!');
