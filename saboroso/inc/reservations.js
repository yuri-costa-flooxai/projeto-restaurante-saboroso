let conn = require('./db');

module.exports = {

    render(req, res, error) {
        res.render('reservations', {
            title: 'Reservas - Restaurante Saboroso',
            background: 'images/img_bg_2.jpg',
            h1: 'Faça sua reserva',
            body: req.body,
            error 
        });
    },

    save(fields) {

        return new Promise((resolve, reject) => {

            let date = fields.date.split('/');
            
            date = `${date[2]}-${date[1]}-${date[0]}`;
            
            if (!fields.name || !fields.email || !fields.people) {
                reject(this.render(req, res, 'Todos os campos são obrigatórios'));
            }
        
            conn.query('INSERT INTO tb_reservations (name, email, people, date) VALUES (?, ?, ?, ?, ?)', 
            [fields.name,
            fields.email,
            fields.people,
            fields.date,
            fields.time]
            , (err, results) => { 
                if (err) {
                    reject(err);
                }
        
                resolve(results);
            });
            
            resolve(results);
            });
        });
    }
};
