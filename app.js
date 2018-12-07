const express = require('express')
const app = express()
const path = require('path');
const request = require('request-json');

var client = request.createClient('http://localhost:1234/');

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/emotiv', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    client.get('emotiv').then(function(response){
      res.send(response.body);
      return response;
    }).catch(function(err){
        res.send(JSON.stringify({erro: err}))
        console.log(err);
    });
})

app.listen(3000, () => console.log('Listening on port 3000!'))