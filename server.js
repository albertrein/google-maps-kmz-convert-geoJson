const express = require('express');
const app = express();
const service = require('./service');

app.listen(process.env.PORT || 3000);

app.get('/', async (request,response) => {
    let mid = request.query.mid;
    if(!mid || mid == ""|| mid == " "){
        response.send({"Invalid Map Id" : "Use: GET mid=googleMapId"})
    }
   let jsonMap = await service.load(request.query.mid);
    response.send(jsonMap);
});