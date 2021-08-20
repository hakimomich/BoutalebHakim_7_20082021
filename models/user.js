const conn = require('../app');


class user  {

    id = 0;

    email = "";

    firstName = "";

    password = "";

    imagUrl = "";

    isAdmin = false;

    constructor(user=null) {

        if (user!=null) {

            this.id = user.id;

            this.email = user.email;

            this.firstName = user.firstName;

            this.password = user.password;

            this.imagUrl = user.imagUrl;

            this.isAdmin = user.isAdmin;

        }

    }

    addUser() {

        return conn.execute("INSERT INTO user (id, email, firstName, password, imagUrl, isAdmin) VALUES (?, ?, ?, ?, ?, ?)", [this.id, this.email, this.firstName, this.password, this.imagUrl, this.isAdmin]);

    }

    deleteUser(id) {

        return conn.execute("DELETE FROM user WHERE id = ?", [id]);

    }

    updateUser() {

        return conn.execute("UPDATE user SET id = ?, email = ?, firstName = ?, password = ?, imagUrl = ?, isAdmin = ?", [this.id, this.email, this.firstName, this.password, this.imagUrl, this.isAdmin]);

    }

    getOneUser(id) {

        return conn.query("SELECT * FROM user WHERE id = ?", [id]);

    }

    getAllUser() {

        return conn.query("SELECT * FROM user");

    }

}

module.exports.user = user;