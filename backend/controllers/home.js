const { pool } = require("../models/db");

//function used to get all the user's and his friends post, ordered decending
const getAllFriendsPosts = (req, res) => {
  const user_id = req.token.userId;

  const query = `(SELECT U.user_id, firstname, lastname, avatar, P.* FROM friends AS F, users AS U, posts AS P
    WHERE CASE WHEN F.user1_id = $1 THEN F.user2_id = U.user_id AND (P.user_id = F.user2_id)
    WHEN F.user2_id = $1 THEN F.user1_id = U.user_id AND (P.user_id = F.user1_id)
    END) 
    UNION 
    (SELECT U.user_id, firstname, lastname, avatar, P.* FROM users AS U, posts AS P
    WHERE P.user_id = $1 AND U.user_id = $1
    )
    ORDER BY created_at DESC
    `;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `Posts not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "All posts",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = { getAllFriendsPosts };