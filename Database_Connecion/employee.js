var db = require('./connect');
var express = require('express');
const bodyparser = require('body-parser');
var fs = require('fs');
var rawdata = fs.readFileSync('./Query/queries.json')
var queries = JSON.parse(rawdata);
var app = express();

app.use(bodyparser.json())
var urlencodedParser = bodyparser.urlencoded({ extended: false })

// Employee all data get..
app.get('/employee', async function (req, res) {
    let pool = await db.connect();
    let result = await pool.request();
    result.query(queries.EmployeeAllRecord, function (err, data) {
        if (err) {
            console.log('faced some issues' + err);
        }
        else {
            res.status(200).send(data)
        }
    })
});

//Add Employee  Record..
app.post('/addemployee', async function (req, res) {
    debugger;
    console.log(req.body)
    let pool = await db.connect();
    let result = await pool.request();
    let AddEmployee = 'Insert into employee (FirstName,LastName,CompanyName,EmailID,PhoneNo) Values(\'' + req.body.FirstName + '\',\'' + req.body.LastName + '\',\'' + req.body.CompanyName + '\',\'' + req.body.EmailID + '\',\'' + req.body.PhoneNo + '\')'
    result.query(AddEmployee , function (err, data) {
        if (err) {
            console.log('faced some issues' + err);
        }
        else {
            res.status(200).send(data);
        }
    })
})


//Update Employee Record..
app.put('/updateemployee/:id', urlencodedParser, async function (req, res) {
    debugger;
    let pool = await db.connect();
    let result = await pool.request();
    let updateemployee = 'update employee set FirstName =\'' + req.body.FirstName + '\',LastName =\'' + req.body.LastName + '\',CompanyName =\'' + req.body.CompanyName + '\',EmailID =\'' + req.body.EmailID + '\',PhoneNo=\'' + req.body.PhoneNo + '\'  where ID =\'' + req.params.id + '\''
    result.query(updateemployee ,function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(data)

        }
    })
})

//Delete Employee Record
app.delete('/deleteemployee/:id', urlencodedParser, async function (req, res) {

    console.log(req.body)
    let pool = await db.connect();
    let result = await pool.request();
    result.query('delete from employee where ID = \'' + req.params.id + '\'', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(data)
        }
    })
})


module.exports = app;



