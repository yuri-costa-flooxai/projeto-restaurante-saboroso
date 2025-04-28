let conn = require('./db')

module.exports = {
    getMenus() {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM tb_menus ORDER BY title', (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              })
        })
    },
    save(fields, files) {

      fields.photo = `images/${path.parse(files.photo.path).base}`;

      let query, queryPhoto = '', params = [
        fields.title,
          fields.description,
          fields.price,
      ];

      if (files.photo) {
        queryPhoto = ',photo = ?';

        params.push(fields.photo);
      }

      if (parseInt(fields.id) > 0) {

        params.push(fields.id);

        query = `
          UPDATE tb_menus
          SET title = ?,
              description = ?,
              price = ?,
              ${queryPhoto}
          WHERE id = ?
        `;
        
      } else {

        if (queryPhoto != '') {
          reject("Envie a foto do prato");

        }
        query = `
          INSERT INTO tb_menus(title, description, price, photo)
          VALUES(?,?,?,?)
        `;
      }

      return new Promise((resolve, reject) => {
        conn.query('INSERT INTO tb_menus(title, description, price, photo) VALUES(?, ?, ?, ?)', [
          fields.title,
          fields.description,
          fields.price,
          fields.photo
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