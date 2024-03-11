const express = require("express");
const Adminpanel = require("../model/adminpanel.model");
const { auth } = require("../middleware/auth.middleware");
const Admin = require("../model/admin.model");

const adminpanelRouter = express.Router();

adminpanelRouter.use(auth);

// Add a new post
adminpanelRouter.post("/add", async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const posts = new Adminpanel(req.body);
    await posts.save();
    res.status(200).json({ msg: "Post added", addPost: req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts
adminpanelRouter.get("/", async (req, res) => {
  try {
    const posts = await Adminpanel.find(req.query);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a post
adminpanelRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const post = await Adminpanel.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await Adminpanel.findByIdAndUpdate({ _id: id }, payload);
    const updatePost = await Adminpanel.find({ _id: id });
    res.status(200).json({ msg: "Post has been updated", updatePost });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a post
adminpanelRouter.patch("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Adminpanel.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await Adminpanel.findByIdAndDelete({ _id: id });
    const deletePost = await Adminpanel.find({ _id: id });
    res.status(200).json({ msg: "Post has been deleted", deletePost });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = {
  adminpanelRouter,
};