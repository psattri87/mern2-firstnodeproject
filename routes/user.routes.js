const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  searchUsersByQuery,
} = require("../controllers/users.controller");
const { validateSearchQuery } = require("../middlewares/validators/users.validator");

router.get("/", getAllUsers);
router.get("/search", validateSearchQuery,searchUsersByQuery);
router.get("/:uuid", getUserById);

module.exports = router;
