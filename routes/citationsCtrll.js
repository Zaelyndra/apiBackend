const models = require('../models');


module.exports = {
    getCitations: function (req, res) {
        models.Citation.findAll({
            attributes: ['titre', 'idUTILISATEURS', 'contenu', 'votePositive', 'voteNegative', 'createdAt', 'updatedAt', 'id'],
        }).then(function (citations) {
            if (citations) {
                return res.status(200).json(citations)
            } else {
                return res.json({'no': 'no'})
            }
        })
    },

    getCitation: function (req, res) {
        models.Citation.findOne({
            attributes: ['id', 'titre', 'idUTILISATEURS', 'contenu', 'votePositive', 'voteNegative'],
            where: {id: req.params.id}
        }).then(function (citation) {
            if (citation) {
                return res.status(200).json(citation)
            } else {
                return res.status(404).json({'Error': 'error'})
            }
        })
    },


    getCitationsUser: function (req, res) {
        models.Citation.findAll({
            attributes: ['id', 'titre', 'idUTILISATEURS', 'contenu', 'votePositive', 'voteNegative', 'updatedAt'],
            where: {idUTILISATEURS: req.params.id}
        }).then(function (citationsUser) {
            if (citationsUser) {
                return res.status(200).json(citationsUser)
            } else {
                return res.status(404).json({'Error': 'error'})
            }
        })
    },


    createCitation: function (req, res) {
        // Params
        let idUTILISATEURS = req.body.idUTILISATEURS;
        let titre = req.body.titre;
        let contenu = req.body.contenu;
        let idCATEGORIES = req.body.idCATEGORIES;

        let newCitation = models.Citation.create({
            idUTILISATEURS: idUTILISATEURS,
            titre: titre,
            contenu: contenu
        })

        models.Citation.findOne({
            attributes: ['id'],
            where: {contenu: contenu}
        }).then(function (citation) {
            if (citation) {
                models.Categorie_citation.create({
                    idCATEGORIES: idCATEGORIES,
                    idCITATIONS: citation.id
                })
            }
        })

        return res.json({'success': 'La citation a bien été crée'})
    },

    updateCitation: function (req, res, next) {
        let values = {titre: req.body.titre, contenu: req.body.contenu}
        let selector = {where: {id: req.params.id}}
        models.Citation.update(values, selector)
            .then(function (success) {
                return res.json({'success': 'La citation a bien été modifié'})
            })
            .catch(function (error) {
                return res.json({'error': 'La citation\'a pas été modifié'})
            })
    },

    deleteCitation: function (req, res) {

        models.Categorie_citation.destroy({
            where: {idCITATIONS: req.params.id}
        })

        models.Citation.destroy({
            where: {id: req.params.id}
        }).then(function (success) {
            return res.json({'success': 'La citation à bien été supprimé'})
        })
    },


}