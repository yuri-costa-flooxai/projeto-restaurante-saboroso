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
    usersDelete(req) {

        return new Promise((s, r) => {

            if (!req.params.id) {
                f('Informe o ID.');
            } else {

                conn.query(`
                DELETE FROM tb_users WHERE id = ?
            `, [
                        req.params.id
                    ], (err, results) => {

                        if (err) {
                            f(err);
                        } else {
                            io.emit('reservations update');
                            s(results);
                        }

                    });

            }

        });

    },
    usersPassword(req) {

        return new Promise((s, f) => {

            let form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {

                if (err) {
                    f(err);
                } else {

                    if (!fields.password) {
                        f('Preencha a senha.');
                    } else if (fields.password !== fields.passwordConfirm) {
                        f('Confirme a senha corretamente.');
                    } else {

                        conn.query(`
                        UPDATE tb_users SET password = ? WHERE id = ?
                    `, [
                                fields.password,
                                fields.id
                            ], (err, results) => {

                                if (err) {
                                    f(err);
                                } else {
                                    s(results);
                                }

                            });

                    }

                }

            });

        });

    },
    users() {
        return new Promise((s, f) => {

            conn.query(
                `
                SELECT * FROM tb_users ORDER BY name
            `,
                (err, results) => {

                    if (err) {
                        f(err);
                    } else {
                        s(results);
                    }

                }
            );

        });
    },
    usersSave(req) {

        return new Promise((s, f) => {

            let form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {

                let query, params;

                if (parseInt(fields.id) > 0) {

                    query = `
                            UPDATE tb_users
                            SET name = ?, email = ?
                            WHERE id = ?
                        `;
                    params = [
                        fields.name,
                        fields.email,
                        fields.id
                    ];


                } else {

                    query = `
                            INSERT INTO tb_users (name, email, password)
                            VALUES(?, ?, ?)
                        `;
                    params = [
                        fields.name,
                        fields.email,
                        fields.password
                    ];

                }

                conn.query(query, params, (err, results) => {

                    if (err) {
                        f(err);
                    } else {

                        io.emit('reservations update', fields);

                        s(fields, results);

                    }

                }
                );

            });

        });

    },
}