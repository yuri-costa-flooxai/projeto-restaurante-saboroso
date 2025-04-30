var conn = require('./db');
module.exports = {

    render(req, res, err, success) {
        res.render('contact', {
            title: 'Contato - Restaurante Saboroso',
            background: 'images/img_bg_3.jpg',
            h1: 'Entre em Contato',
            body: req.body,
            error,
            success
        });
    },

    getContacts () {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM tb_contacts ORDER BY id DESC', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM tb_contacts WHERE id = ?', [
                id
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    save(fields) {
        return new Promise((resolve, reject) => {

            conn.query('INSERT INTO tb_contacts (name, email, message) VALUES (?, ?, ?)'
                , [
                    fields.name, fields.email, fields.message
                ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}