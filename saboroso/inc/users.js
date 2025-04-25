const { connect } = require("../routes/admin")

module.exports = {

    render(req, res, error) {
        res.render('admin/login', {
            body: req.body,
            error
        });
    },

    login(email, password) {

        return new Promise((resolve, reject) => {

            connect.query('SELECT * FROM tb_users WHERE email = ? ', [email, password], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (!results.length > 0) {
                        reject({ message: "Usuário ou senha incorretos."});
                    } else {
                        let row = results[0];

                        if (row.password != password) {
                            reject({ message: "Usuário ou senha incorretos."});
                        } else {
                            resolve(row);
                        }
                    }
                }
            });
        });
    },
}