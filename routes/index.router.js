const express = require('express');
const router = express.Router();
const AuthToken = require('../midelware/auth')
const IsAdminOrNot = require('../midelware/isAdmiin')
const cntrlUser = require('../controllers/user.controller')
const cntrlEmployee = require('../controllers/employees.controller')
const cntrlAuth = require('../controllers/Auth.controller')
router.post('/registrer', cntrlUser.registrer);
router.get('/employe', cntrlEmployee.GetEmployee)
router.get('/employe/:id', cntrlEmployee.GetEmpById)
router.post('/employe', AuthToken, cntrlEmployee.AddEmploy) // access with with valid json web token 
router.put('/employe/:id', cntrlEmployee.UpdateEmploye)
router.delete('/employe/:id', [AuthToken, IsAdminOrNot], cntrlEmployee.DeleteEmploye) // delete if user have valid json web token and user is admin

router.post('/Auth', cntrlAuth.ConnexionUser); // pour sign In


module.exports = router;