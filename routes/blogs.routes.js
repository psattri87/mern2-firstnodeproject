const router = require("express").Router();
const {
  createNewBlog,
  getAllBlogs,
  deleteBlogById,
  updateBlogById,
  putBlogById,
  searchBlogByQuery,
} = require("../controllers/blogs.controller");

router.get("/", getAllBlogs);
router.get("/search/", searchBlogByQuery);
router.post("/new", createNewBlog);
router.delete("/:id", deleteBlogById);
router.patch("/:id", updateBlogById);
router.put("/:id", putBlogById);

module.exports = router;
