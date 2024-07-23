const { Router } = require("express");
const isAdmin = require("../middlewares/is-admin");
const isAuthed = require("../middlewares/is-auth");
const {
  getAll,
  getByHashtag,
  getById,
  getRandom,
  getTop,
  getUsersCount,
  post,
  put,
  remove,
  getUsersWithPost,
} = require("../controllers/blog.controller");

const router = Router();

router.get("/", isAuthed, getAll);
router.get("/:id", isAuthed, getById);
router.get("/:hashtag", isAuthed, getByHashtag);
router.get("/random", isAuthed, getRandom);
router.get("/top", isAuthed, getTop);
router.get("/users/count", isAdmin, getUsersCount);
router.get("/user/posts", isAuthed, getUsersWithPost);

router.post("/", isAuthed, post);
router.put("/:id", isAdmin, put);
router.delete("/:id", isAuthed, remove);

module.exports = router;
