const { pool } = require("../models/db");

const userCount = (req, res) => {
  pool
    .query(`SELECT COUNT(*) FROM users`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const postCount = (req, res) => {
  pool
    .query(`SELECT COUNT(*) FROM posts`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const likeCount = (req, res) => {
  pool
    .query(`SELECT COUNT(*) FROM likes`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const registeredUserPerDay = (req, res) => {
  pool
    .query(
      `SELECT extract(DAY FROM created_at) AS "Date of day", COUNT(*) FROM users GROUP BY extract(DAY FROM created_at)`
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const addedPostPerDay = (req, res) => {
  pool
    .query(
      `SELECT extract(DAY FROM created_at) AS "Date of day", COUNT(*) FROM posts GROUP BY extract(DAY FROM created_at)`
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const registeredUserDetailWithin24h = (req, res) => {
  pool
    .query(
      `SELECT user_id, firstname, lastname, email
      FROM public.users AS "users"
      WHERE "users"."created_at" BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()
      ORDER BY "users"."created_at" DESC`
    )
    .then((result) => {
      res.status(200).json({
        detail: result.rows,
        count: result.rowCount,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

const postsEveryHour = (req, res) => {
  pool
    .query(
      ` Select  extract (hour FROM date_trunc('hour', created_at)) AS time, count(*) from posts group by 1`
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const activeUserOrNot = (req, res) => {
  const query = `SELECT users.user_id, count( posts.user_id ) FROM users LEFT JOIN posts ON users.user_id=posts.user_id GROUP BY users.user_id
`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = {
  userCount,
  postCount,
  likeCount,
  registeredUserPerDay,
  addedPostPerDay,
  registeredUserDetailWithin24h,
  postsEveryHour,
  activeUserOrNot,
};