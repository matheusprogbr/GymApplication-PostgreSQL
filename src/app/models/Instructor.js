const db = require('../config/db');

module.exports = {
  all: (callback) => {
    const query = `SELECT instructors.*, count(members) AS total_students 
                   FROM instructors LEFT JOIN members ON(instructors.id = members.instructor_id)
                   GROUP BY instructors.id
                   ORDER BY name ASC`;

    db.query(query, (err, results) => {
      if (err) throw `DATABASE error! ${err}`;

      callback(results.rows);
    });
  },
  create: (values, callback) => {
    const queryInsert = `INSERT INTO instructors ("avatar_url","name","birth","gender","services","created_at") 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`;

    db.query(queryInsert, values, (err, results) => {
      if (err) throw `DATABASE error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find: (id, callback) => {
    const query = `SELECT * FROM instructors WHERE id = $1`;

    db.query(query, [id], (err, results) => {
      if (err) throw `DATABASE error! ${err}`;

      callback(results.rows[0]);
    })
  },
  findBy: (filter, callback) => {
    const query = `SELECT instructors.*, count(members) AS total_students 
    FROM instructors LEFT JOIN members ON(instructors.id = members.instructor_id)
    WHERE instructors.name ILIKE '%${filter}%'
    OR instructors.services ILIKE '%${filter}%'
    GROUP BY instructors.id
    ORDER BY name ASC`;

    db.query(query, (err, results) => {
      if (err) throw `DATABASE error! ${err}`;

      callback(results.rows);
    });
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

    db.query(query, values, (err, results) => {
      if (err) throw `DATABASE error! ${err}`;

      callback();
    })

  },
  delete: (id, callback) => {
    const query = `DELETE FROM instructors WHERE id = $1`;

    db.query(query, [id], (err, results) => {
      if (err) throw `DATABASE error! ${err}`;

      callback();
    })
  },
  paginate: (params) => {
    const {
      filter,
      limit,
      offset,
      callback
    } = params;

    let query = "",
      filterQuery = "",
      totalQuery = `(SELECT count(*) FROM instructors) AS total`;

    if (filter) {
      filterQuery = ` WHERE instructors.name ILIKE '%${filter}%' OR instructors.services ILIKE '%${filter}%`;

      totalQuery = `(SELECT count(*) FROM instructors
                    ${filterQuery})
                    AS total`;

    }

    query = `SELECT instructors.*, ${totalQuery}, count(members) AS total_students 
     FROM instructors LEFT JOIN members ON(instructors.id = members.instructor_id)
     ${filterQuery}
     GROUP BY instructors.id LIMIT $1 OFFSET $2
     `;

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `DATABASE ERROR ${err}`;
      callback(results.rows);
    });
  }
};