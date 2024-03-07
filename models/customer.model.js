const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a name"],
        },
        id:{
            type: Number,
            required: true,
            
        },
        password:{
            type: Number,
            required: [true, "Please enter a password with numbers"]
        }



    },
    {
    timestamps: true
    }

);


const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
