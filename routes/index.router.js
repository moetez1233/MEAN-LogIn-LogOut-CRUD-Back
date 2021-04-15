const express = require('express');
const router = express.Router();

const cntrlUser = require('../controllers/user.controller')
const cntrlEmployee = require('../controllers/employees.controller')
router.post('/registrer', cntrlUser.registrer);
router.get('/employe', cntrlEmployee.GetEmployee)
router.get('/employe/:id', cntrlEmployee.GetEmpById)
router.post('/employe', cntrlEmployee.AddEmploy)
router.put('/employe/:id', cntrlEmployee.UpdateEmploye)
router.delete('/employe/:id', cntrlEmployee.DeleteEmploye)


module.exports = router;