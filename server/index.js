const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/nombres', (req, res) =>{
    res.send({nombre:'andre'});
});


app.listen(3000, () => console.log('Listening on port 3000'));
// app.post()
// app.put()
// app.delete()

