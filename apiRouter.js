//Imports
const express = require('express');
const  citationCtrl = require('./routes/citationsCtrll');
const userCtrl = require('./routes/userCtrl')

// Initialisation du router
exports.router = (function () {
    const apiRouter = express.Router();

    //GET
    apiRouter.route('/citations/').get(citationCtrl.getCitations);
    apiRouter.route('/citation/:id').get(citationCtrl.getCitation);
    apiRouter.route('/citations/user/:id').get(citationCtrl.getCitationsUser)

    //POST
    apiRouter.route('/create_citation/:id').post(citationCtrl.createCitation)
    apiRouter.route('/register/').post(userCtrl.register)

    //PUT
    apiRouter.route('/modify_citation/:id').put(citationCtrl.updateCitation)

    //DELETE
    apiRouter.route('/delete_citation/:id').delete(citationCtrl.deleteCitation)

    return apiRouter;
})();
