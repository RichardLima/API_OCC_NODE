const port = process.env.PORT || 4000
const express = require('express')
const request = require('request')
const app = express()

var login = function (req, res, next) {
    request({
        method: 'POST',
        rejectUnauthorized: false,
        url: 'https://ccstore-z9pa.oracleoutsourcing.com/ccstore/v1/login',
        headers:
            { 'Content-Type': 'application/x-www-form-urlencoded' },
        form:
        {
            grant_type: 'password',
            username: 'teste@hotmail.com',
            password: 'C0nnect123'
        }
    }, function (error, response, body) {
        if (error) throw new Error(error);
        body = JSON.parse(body);
        req.access_token = body.access_token
        // console.log(req.access_token)
        next()

    })
}

app.use(login);


app.get('/', login, function (req, res) {
    var token = req.access_token;
    console.log(token);
    res.send('xxx' + token);
});


app.listen(port, function () {
    console.log("Rodando na porta: ", port)
})


