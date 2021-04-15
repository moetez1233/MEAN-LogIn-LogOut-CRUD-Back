const mongoose = require('mongoose');

const User = mongoose.model('User'); // ona declarer User dons user.model.js ligne 17
// on cree une fonction s'appel registrer et fait l'appeler dons index.router.js
module.exports.registrer = (req, res, next) => {
    var user = new User()
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc)

        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    })
}