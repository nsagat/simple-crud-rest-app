const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Customer = require('./models/customer.model.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
//app.use("/api/customer", customerRoutes);




app.get('/', (req, res) => {
    res.send('CRUD is starting');
});






app.get('/api/customer', async(req, res) => {
    try{
        const customers = await Customer.find({});
        res.status(200).json(customers);
    }catch{
        res.status(500).json({message: error.message});
    }
});

app.get('/api/customer/:id', async(req,res) => {
    try{
        const { id } = req.params;
        const customer = await Customer.findById(id);
        res.status(200).json(customer);
    }catch{
        res.status(500).json({message: error.message});
    }
});

app.post('/api/customer', async(req, res) => {
    try{
       const customer =  await Customer.create(req.body);
       res.status(200).json(customer);
    }catch(error){
        res.status(500).json({message: error.message});

    }

});


//update a customer
//updating based on the customer id

app.put('/api/customer/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body);

        if(!customer){
            return res.status(404).json({message: "Customer is not found"});
        }

        const updatedCustomer = await Customer.findById(id);
        //gives the whole updated customer info
        res.status(200).json(updatedCustomer);

    }catch(error){
        res.status(500).json({message: error.message});
    }
});


//delete a customer

app.delete('/api/customer/:id', async(req, res) => {
    try{
        const { id } = req.params;

        const customer = await Customer.findByIdAndDelete(id);
        if(!customer){
            return res.status(404).json({message: "Customer is not found"});
        }

        res.status(200).json({message: "Customer is deleted succesfully"});

    }catch{
        res.status(500).json({message: error.message});
    }
});

mongoose.connect('mongodb+srv://{}.4gmilj2.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB')
.then(()=>{
    console.log("Connected to the database!");
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
}).catch(()=>{
    console.log("Connection to database failed!");
});


