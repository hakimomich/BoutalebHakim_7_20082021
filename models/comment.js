const conn = require('../app');

class comment {

    articleId = 0;

    id = 0;

    content = "";

    constructor(comment=null) {

        if (comment!=null) {

            this.articleId = comment.articleId;

            this.id = comment.id;

            this.content = comment.content;

        }

    }

    add() {

        return conn.execute("INSERT INTO comment (articleId, userId, content) VALUES (?, ?, ?)", [this.articleId, this.userId, this.content]);

    }

    delete(id) {

        return conn.execute("DELETE FROM comment WHERE id = ?", [id]);

    }

    update() {

        return conn.execute("UPDATE comment SET articleId = ?, userId = ?, content = ?", [this.articleId, this.userId, this.content]);

    }

    getOne(id) {

        return conn.query("SELECT * FROM comment WHERE id = ?", [id]);

    }

    getAll() {

        return conn.query("SELECT * FROM comment");

    }

}

module.exports.comment = comment;