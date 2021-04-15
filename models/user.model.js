const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
        saltSecret: String
    })
    // tcheck if this email is valid or not 
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
// a l'aide de ce ecriture on fait une verification au password avant l'execution du fonction save qui se trouve dans la fonction registrer dons user.controller
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