const express = require('express');
const app = express();

const shIn = require('./shimInterface.js')


app.get('/', (req, res) => {
    console.log(shIn.createAccount());
    res.send(JSON.stringify(shIn.createAccount()));
});


app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/nombres', (req, res) =>{
    res.send({nombre:'andre'});
});

app.get('/api/createProject', (req, res) =>{

    res.send({nombre:'andre'});
});

app.get('/getActiveProjects', (req, res) =>{
    shIn.getActiveProjects()
    .then(activeProjects => res.send(activeProjects));
});


app.listen(3000, () => console.log('Listening on port 3000'));
// app.post()
// app.put()
// app.delete()

