const models = require('../models');
let bcrypt = require("bcrypt");
let jwUtilis = require('../outils/jwt.outils')


module.exports = {
    register: function (req, res) {
        // Params
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let password = req.body.password;
        let identifiant = req.body.identifiant;
        let mail = req.body.mail;
        let idROLES = req.body.idROLES;


        let bcrytedPassword = bcrypt.hash(password, 5)
            .then(function (bcrytedPassword) {
                let newUser = models.Utilisateur.create({
                    nom: nom,
                    prenom: prenom,
                    password: bcrytedPassword,
                    identifiant: identifiant,
                    mail: mail,
                    idROLES: idROLES
                })
                    .then(function (newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        });
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'cannot add user'});
                    });
            })
    }
}