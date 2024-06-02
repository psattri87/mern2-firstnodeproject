// const { findAllBlogs, createBlogDocument } = require("../services/blogs.service");
const BlogService = require("../services/blogs.service");
const BlogsModel = require("../models/blogs.models");
const validator = require("validator");
const BlogServiceInstance = new BlogService();

const createNewBlog = async (req, res) => {
  try {
    const newBlogDoc = await BlogServiceInstance.create(req.body);
    return res.json(newBlogDoc);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const result = await BlogServiceInstance.findAll();
    res.json(result);
  } catch {
    return res.status(500).json({ message: "Could not fetch blogs" });
  }
};

const deleteBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await BlogServiceInstance.deleteById(id);
    res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

const updateBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await BlogServiceInstance.updateById(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const putBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await BlogServiceInstance.putById(id, req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
const searchBlogByQuery = async (req, res) => {
  const { title, authorEmail } = req.query;
  if (title && authorEmail) {
    try {
      const result = await BlogsModel.find({
        title,
        authors: { $elemMatch: { email: authorEmail } },
      });
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (title) {
    try {
      const result = await BlogsModel.find({ title: title });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "invalid title" });
    }
  }
};

module.exports = {
  createNewBlog,
  getAllBlogs,
  deleteBlogById,
  updateBlogById,
  putBlogById,
  searchBlogByQuery,
};
