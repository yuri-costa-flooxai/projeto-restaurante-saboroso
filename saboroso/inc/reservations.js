let conn = require('./db');

module.exports = {

    getReservations() {

        return new Promise((resolve, reject) => {

            conn.query('SELECT * FROM tb_reservations ORDER BY DESC', (err, results) => {
                if (err) {

                  reject(err);
                } else {

                  resolve(results);
                }
            })
          })
      },

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

            if (fields.date.indexOf('/') > -1) {
                let date = fields.date.split('/');
            
                fields.date = `${date[2]}-${date[1]}-${date[0]}`;
            }

            

            let query, params;

            if(parseInt(fields.id) > 0) {

                query = `
                    UPDATE tb_reservations
                    SET name = ?,
                        email =?,
                        people =?,
                        date =?,
                        time =?
                        WHERE id =?`;
                    params.push(fields.id);

            } else {
                query = `
                    INSERT INTO tb_reservations (name, email, people, date, time)
                    VALUES (?,?,?,?,?)`;
            }
            
            if (!fields.name || !fields.email || !fields.people) {
                reject(this.render(req, res, 'Todos os campos são obrigatórios'));
            }
        
            conn.query(query, params, (err, results) => {
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
          conn.query(`
            DELETE FROM tb_reservations
            WHERE id =?
          `, [
            id
          ], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          })
        })
      }
}

    

