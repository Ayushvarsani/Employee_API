var express = require('express');
var db=require('./Database_Connecion/connect');
var emp = require('./Database_Connecion/employee');
// var subject = require('./Database_Connecion/subject');
// var login = require('./Database_Connecion/login');
var app = express();
var cors=require('cors');
// const port = process.env.PORT || 3400;
// const host = '0.0.0.0';
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200   
}
app.use(cors(corsOptions));
app.use(emp);

app.listen(3400);
{
    console.log("Listening to port 3400")
}


module.exports=app;

