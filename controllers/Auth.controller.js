const config = require('config')
const JWt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
//const {JWT_SECRET} = require('../config/keys')

module.exports.ConnexionUser = async(req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email ')
    const validPasword = await bcrypt.compare(req.body.password, user.password)
    if (!validPasword) return res.status(400).send('invalid password ')
    const token = user.generateAuthToken() // yjib l function l mawjouda fi user model dans schema.methodes qui contien token
    const decoded = JWt.verify(token, 'JwtPrivateKey')

    res.send({
            "token": token,
            "status": true,
            "dataUser": decoded

        })
        /* si je veut decoder le token  */

    /* end decoded token  */





}