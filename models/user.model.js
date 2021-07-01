const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWt = require('jsonwebtoken')
    //const {JWT_SECRET} = require('../config/keys') // remplacer tous  JwtPrivateKey par JWT_SECRET => pour meetre le mots de secret securise

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'full name can\'t be empty '
    },
    email: {
        type: String,
        required: 'email can\'t be empty ',
        unique: true

    },
    password: {
        type: String,
        required: 'Password can\'t be empty ',
        minlength: [4, 'password must be atleast 4 caractere  ']

    },
    isAdmin: Boolean,
    saltSecret: String
})

// tcheck if this email is valid or not 
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
// on fait a token of this user 
userSchema.methods.generateAuthToken = function() {
    const token = JWt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'JwtPrivateKey'); // return token contien  id and name codé 
    return token;
}

// a l'aide de ce ecriture on fait codage de password par la  fonction save   qui se trouve dans la fonction registrer dons user.controller
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);