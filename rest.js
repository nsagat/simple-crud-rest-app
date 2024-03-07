const express = require('express');
const app = express();
app.use(express.json());
const customerList = [
    { id:1, name: 'Eli'},
    { id:2, name: 'Nilu'},
    { id:3, name: 'Sam'},
    { id:4, name: 'Nic'},
    { id:5, name: 'Love'},
];
app.get('/', (request, response) => {
    response.send('starting');
});

app.get('/api/v1/customer', (request, response) => {
    response.send(customerList);

});


app.get('/api/v1/customer/:id',(request, response)=>{
    //response.send(request.query);
    const listed = customerList.find(c => c.id === parseInt(request.params.id));
    if(!listed) response.status(404).send('the id is not found');
    response.send(listed);
});

//post
app.post('/api/v1/customer', (request, response) =>{

if(!request.body.name || request.body.name.length < 3){
    //400 bad request
    response.status(400).send('Name is required and should be minimum 3 characters');
    return;
}

    const newPerson = {
        id: customerList.length + 1,
        name: request.body.name
    };
    customerList.push(newPerson);
    response.send(newPerson)
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
