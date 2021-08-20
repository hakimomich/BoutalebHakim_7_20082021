const conn = require('../app');


class article {

    id = 0;

    title = "";

    content = "";

    articleUrl = "";

    imagUrl = "";

    constructor(article=null) {

        if (article!=null) {

            this.id = article.id;

            this.title = article.title;

            this.content = article.content;

            this.articleUrl = article.articleUrl;

            this.imagUrl = article.imagUrl;

        }

    }
    addArticle() {

        return conn.execute("INSERT INTO article (userId, title, content, articleUrl) VALUES (?, ?, ?, ?)", [this.userId, this.title, this.content, this.articleUrl]);

    }

    deleteArticle(id) {

        return conn.execute("DELETE FROM article WHERE id = ?", [id]);

    }

    updateArticle() {

        return conn.execute("UPDATE article SET userId = ?, title = ?, content = ?, articleUrl = ?", [this.userId, this.title, this.content, this.articleUrl]);

    }

    getOneArticle(id) {

        return conn.query("SELECT * FROM article WHERE id = ?", [id]);

    }

    getAllArticle() {

        return conn.query("SELECT * FROM article");

    }
}

module.exports.article = article;