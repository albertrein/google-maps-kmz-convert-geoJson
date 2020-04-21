const express = require('express');
const app = express();
const service = require('./service');
app.listen(3000);

app.get('/', async (request,response) => {
   let jsonMap = await service.load(request.query.mid);
    response.send(jsonMap);
});