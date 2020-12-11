let jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '8hm64k74HmF2V4V68f2uSgNRRD7uvvX2H2QQe8vbj38sWtS';

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
                utilisateurId: userData.id,
                identifiant: userData.identifiant
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    }
}