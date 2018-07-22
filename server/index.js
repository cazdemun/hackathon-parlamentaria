const express = require('express');
const app = express();

const shIn = require('./shimInterface.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json()); 

app.get('/', (req, res) => {
    console.log(shIn.createAccount());
    //res.send(JSON.stringify(shIn.createAccount()));
    res.send('Connection Succeded');
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
    .then(activeProjects => {
        
        let response = {
            value: activeProjects
        }
        
        res.json(response);
    });
});

app.post('/voteProject', (req, res) => {
    shIn.voteProject(req.body.dni, req.body.value, req.body.id)
    .then(txReceipt =>{
        console.log(txReceipt.transactionHash);
        res.json({ value: "success"});
    });
});

app.listen(8080, () => console.log('Listening on port 8080'));
// app.post()
// app.put()
// app.delete()

