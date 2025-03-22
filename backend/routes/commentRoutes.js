const express = require("express");
const { getComments, addComment } = require("../controllers/commentController");

const router = express.Router();

router.get("/:blogId", getComments);
router.post("/:blogId", addComment);

module.exports = router;
