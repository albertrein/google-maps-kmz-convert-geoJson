const express = require('express');
const app = express();
const service = require('./service');
app.listen(3000);

app.get('/', (request,response) => {
   service().teste;
    response.send('<h1>Hello World</h1>')
});