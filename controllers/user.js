const {user} = require('../models/user');

exports.addUser = (req, res, next)=>{
    const userObject = JSON.parse(req.body.user);
    delete userObject.id;
    const unuser = new user({
        ...userObject,
    });
    unuser.save()
    .then(()=>res.status(201).json({message: 'user enregistrer'}))
    .catch(error=> res.status(400).json({error}));
};

exports.deleteUser = (req, res, next)=>{
    
    user.findOne({id: req.params.id})
        .then(data =>{
                user.deleteOne({ id: req.params.id })
                    .then(()=> res.status(200).json({ message: 'user supprimé'}))
                    .catch( error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.updateUser = (req, res, next)=>{

    const userObject = req.file ?
        { 
            ...JSON.parse(req.body.user),
        } : { ...req.body };
    user.updateOne({ id: req.params.id}, { ...userObject, id: req.params.id })
        .then(()=> res.status(200).json({ message: 'user modifié !' }))
        .catch( error => res.status(400).json({ error }));

};

exports.getOneUser = (req, res, next)=>{
    user.findOne({ id: req.params.id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllUser = (req, res, next)=>{
    user.find()
    .then(users => res.status(200).json(users))
    .catch( error => res.status(400).json({error}));
};