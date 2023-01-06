const { Category, validateBody } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find({});

  res.send(categories);
});

router.post("/", validateBody, async (req, res) => {
  const category = new Category(req.body);

  await category.save();

  res.send(category);
});

router.put("/:id", validateBody, async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  res.send(category);
});

module.exports = router;
