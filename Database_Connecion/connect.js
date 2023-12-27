const sql = require('mssql')
const config = {
    user: 'sa',
    password: 'sp@1234',
    server: 'DEV-1224',

    options: {
        database: 'Employee',
        instanceName: 'SQL2019',
        encrypt: true,
        enableArithPort: true,
        trustServerCertificate: true,
        requestTimeout: 300000,
        connectionTimeout: 300000,
        port: 1433,
        pool: {
            max: 100,
            min: 0,
            idleTimeoutMillis: 300000
        },
    }
}


sql.connect(config, function (err) {
    if (err) {
        console.log("Failed to connect db:" + err)
        // console.log(err)
        res.send(err)
    }
    else {
        console.log("DB Connected successfully")
    }
})

module.exports = sql;
