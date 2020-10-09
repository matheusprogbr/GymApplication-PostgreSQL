const db = require('../config/db');

module.exports = {
  all: (callback) => {
    const query = `SELECT * FROM members ORDER BY name ASC`;

    db.query(query, (err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback(results.rows);
    });
  },
  create: (values,callback) => {
    const query = `INSERT INTO members (avatar_url,name,email,birth,gender,weight,height,blood,instructor_id) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                   RETURNING id`;

    db.query(query,values, (err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find: (id,callback) => {
    const query = `SELECT members.*, instructors.name AS instructor_name FROM members 
                   LEFT JOIN instructors ON (members.instructor_id = instructors.id)
                   WHERE members.id = $1`;

    db.query(query,[id], (err, results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback(results.rows[0]);
    });
  },
  update: (values,callback) => {
    const query = `UPDATE members SET
                   avatar_url = $1,
                   name = $2,
                   email = $3,
                   birth = $4,
                   gender = $5,
                   weight = $6,
                   height = $7,
                   blood = $8,
                   instructor_id = $9
                   WHERE id = $10`

    db.query(query,values, (err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback();
    });
  },
  delete: (id,callback) => {
    const query = `DELETE FROM members WHERE id = $1`;

    db.query(query,[id],(err,results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback();
    })
  },
  instructor: (callback) => {
    const query = `SELECT name, id FROM instructors`;

    db.query(query,(err, results) => {
      if(err) throw `DATABASE error! ${err}`;

      callback(results.rows);
    });
  }
};