const mongoose = require('mongoose');

//const Employee = mongoose.model('Employee');
var { Employee } = require('../models/employees.model');
var ObjectId = require('mongoose').Types.ObjectId; // sta3milneha bech lawjou 3al id 

module.exports.GetEmployee = (req, res, next) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs) } else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });

}

module.exports.GetEmpById = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.AddEmploy = (req, res, next) => {
    var emp = new Employee()

    //emp.name: req.body.name,
    emp.name = req.body.name,
        emp.position = req.body.position,
        emp.office = req.body.office,
        emp.salary = req.body.salary,

        emp.save((err, doc) => {
            if (!err) { res.send(doc); } else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
        });
}

module.exports.UpdateEmploye = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.DeleteEmploye = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
}