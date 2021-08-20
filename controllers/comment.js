const {comment} = require('../models/comment');


exports.addComment = (req, res, next)=>{
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject.id;
    const monComment = new comment({
        ...commentObject,
    });
    monComment.save()
    .then(()=>res.status(201).json({message: 'commentaire enregistrer'}))
    .catch(error=> res.status(400).json({error}));
};

exports.deleteComment = (req, res, next)=>{
    
    comment.findOne({id: req.params.id})
        .then(data =>{
                comment.deleteOne({ id: req.params.id })
                    .then(()=> res.status(200).json({ message: 'commentaire supprimé'}))
                    .catch( error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.updateComment = (req, res, next)=>{

    const commentObject = req.file ?
        { 
            ...JSON.parse(req.body.comment)
        } : { ...req.body };
    comment.updateOne({ id: req.params.id}, { ...commentObject, id: req.params.id })
        .then(()=> res.status(200).json({ message: 'commentaire modifié !' }))
        .catch( error => res.status(400).json({ error }));

};

exports.getOneComment = (req, res, next)=>{
    comment.findOne({ id: req.params.id })
    .then(commentaire => res.status(200).json(commentaire))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllComment = (req, res, next)=>{
    comment.find()
    .then(comments => res.status(200).json(comments))
    .catch( error => res.status(400).json({error}));
};