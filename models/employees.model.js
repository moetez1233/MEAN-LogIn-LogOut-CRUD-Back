const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
});

module.exports = { Employee };

/*
var employeSchema = new mongoose.Schema({
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
})
mongoose.model('Employee', employeSchema);*/
/*
var employeeSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    position: {
        type: String,


    },
    office: {
        type: String,


    },
    salary: {
        type: String,


    }

})
mongoose.model('Employee', employeeSchema);*/