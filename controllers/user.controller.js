const mongoose = require('mongoose');
var nodemailer = require('nodemailer'); // sed email
var sgTransport = require('nodemailer-sendgrid-transport'); // send email 
//const sgMail = require('@sendgrid/mail') // autre methode de send email
const User = mongoose.model('User'); // ona declarer User dons user.model.js ligne 17



/* njibo l api key il 3malneh fi site sendgrid.com */
const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: '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'
    }
}))

/*const apikey = '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';
sgMail.setApiKey(apikey)*/
/* end get api key  */
// on cree une fonction s'appel registrer et fait l'appeler dons index.router.js
module.exports.registrer = (req, res, next) => {
    var user = new User()
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin
    user.save((err, doc) => {
        if (!err) {
            const token = user.generateAuthToken() // get token qui se trouve dans user model dans schema

            res.header('x-Moetez-Auth-token', token).send(doc) // send token in the header nomme x-Moetez-Auth-token et les donnes d'user (fullname,email,password)
                /*var email = {
                    to: 'maddourimoetez@enetcom.u-sfax.tn ',
                    from: 'moetezmaddouri@gmail.com',
                    subject: 'Hi there',
                    text: 'Awesome sauce',
                    html: '<b>Awesome sauce</b>'
                };

                sgMail
                    .send(email)
                    .then(() => {
                        console.log('Email sent')
                    })
                    .catch((error) => {
                        console.error(error)
                    })*/
            transporter.sendMail({
                to: user.email,
                from: 'replaydenied@gmail.com',
                subject: "Count created",
                html: `
                        <p>create a count  success</p>
                        `
            })
        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    })
}