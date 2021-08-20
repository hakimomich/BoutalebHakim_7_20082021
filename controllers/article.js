const {article} = require('../models/article');

exports.addArticle = (req, res, next)=>{
    const articleObject = JSON.parse(req.body.article);
    delete articleObject.id;
    const monArticle = new article({
        ...articleObject,
        imagUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    monArticle.save()
    .then(()=>res.status(201).json({message: 'article enregistrer'}))
    .catch(error=> res.status(400).json({error}));
};

exports.deleteArticle = (req, res, next)=>{
    
    article.findOne({id: req.params.id})
        .then(data =>{
            const filename = data.imagUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                article.deleteOne({ id: req.params.id })
                    .then(()=> res.status(200).json({ message: 'article supprimé'}))
                    .catch( error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));

};

exports.updateArticle = (req, res, next)=>{

    const articleObject = req.file ?
        { 
            ...JSON.parse(req.body.article),
            imagUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    article.updateOne({ id: req.params.id}, { ...articleObject, id: req.params.id })
        .then(()=> res.status(200).json({ message: 'article modifié !' }))
        .catch( error => res.status(400).json({ error }));

};

exports.getOneArticle = (req, res, next)=>{
    article.findOne({id: req.params.id})
    .then(article =>res.status(200).json(article))
    .catch( error => res.status(400).json({error}));
};


exports.getAllArticle = (req, res, next)=>{
    article.find()
    .then(articles => res.status(200).json(articles))
    .catch( error => res.status(400).json({error}));
};
