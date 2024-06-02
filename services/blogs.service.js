const BlogsModel = require("../models/blogs.models");

const findAllBlogs = async () => {
  const result = await BlogsModel.find({});
  return result;
};

const createBlogDocument = async (data) => {
  const newBlogDoc = new BlogsModel(data);
  const result = await newBlogDoc.save();
  return result;
};

class BlogService {
  findAll = async () => {
    const result = await BlogsModel.find({});
    return result;
  };
  create = async (data) => {
    const newBlogDoc = new BlogsModel(data);
    const result = await newBlogDoc.save();
    return result;
  };
  deleteById = async (id) => {
    const result = await BlogsModel.findOneAndDelete({ _id: id });
    return result;
  };
  updateById = async (id, body) => {
    const result = await BlogsModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return result;
  };
  putById = async (id, body) => {
    const result = await BlogsModel.findOneAndReplace({ _id: id }, body, {
      new: true,
    });
    return result;
  };
}

// module.exports = { findAllBlogs, createBlogDocument };
module.exports = BlogService;
