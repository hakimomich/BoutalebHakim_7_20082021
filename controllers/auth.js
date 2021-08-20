const bcrypt = require('bcrypt');
const MaskData = require('maskdata');
const jwt = require('jsonwebtoken');
const {user} = require('../models/user');

// Fonction qui permet a l'utilisateur de se crée un espace user, l'email est crypter avec MaskData, et le password et crypter avec bcrypt.
exports.signup = (req, res, next) => {

  const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const User = new user({
        email: maskedEmail,
        password: hash
      });
      User.save()
        .then(() => res.status(201).json({ message: 'utilisateur crée !' }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Fonction login qui permet à un utilisateur de se connecter à son espace. Email crypter avec MaskData et password crypter avec bcrypt.
exports.login = (req, res, next) => {
  const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
  };
  const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
  user.findOne({ email: maskedEmail })
    .then(data => {
      if (!data) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, data.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            id: data.id,
            token: jwt.sign(
              { id: data.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};