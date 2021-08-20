const jwt = require('jsonwebtoken');

// middleware d'authentification qui permet de faire une requete sssi l'utilisateur est authentifier.
// Le module est exporter dans le routeur.
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User id non Valable !';
        }else{
            next();
        }
    }catch(error){
        res.status(401).json({ error: error | 'requète non authentifié'});
    }
};