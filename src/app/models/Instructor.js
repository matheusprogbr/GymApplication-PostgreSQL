const db = require('../config/db');

module.exports = {
  all: (callback) => {
    const query = `SELECT * FROM instructors ORDER BY name ASC`;

    db.query(query,(err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback(results.rows);
    });
  },
  create: (values,callback) => {
    const queryInsert = `INSERT INTO instructors ("avatar_url","name","birth","gender","services","created_at") 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`;

    db.query(queryInsert, values, (err, results) => {
      if(err) throw `DATABASE error! ${err}`;
      
      callback(results.rows[0]);
    });
  },
  find: (id,callback) => {
    const query = `SELECT * FROM instructors WHERE id = $1`;

    db.query(query,[id],(err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback(results.rows[0]);
    })
  },
  update: (values, callback) => {
    const query = `UPDATE instructors SET
                  avatar_url = $1,
                  name = $2,
                  birth = $3,
                  gender = $4,
                  services = $5
                  WHERE id = $6
                  `

    db.query(query,values, (err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback();
    })
    
  },
  delete: (id,callback) => {
    const query = `DELETE FROM instructors WHERE id = $1`;

    db.query(query,[id], (err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback();
    })
  }
};