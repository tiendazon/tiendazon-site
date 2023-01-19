const { Category, validateBody } = require("../models/category");
const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find({}).sort("name");

  res.send(categories);
});

router.get("/:id", [auth, admin], async (req, res) => {
  try {
    const categorie = await Category.findById(req.params.id);
    if (!categorie) return res.status(404).send("Categoría no encontrada");

    res.send(categorie);
  } catch (err) {
    if (err.kind === "ObjectId") res.status(400).send("Categoría no valida");
  }
});

router.post("/", [auth, admin], validateBody, async (req, res) => {
  const category = new Category(req.body);

  await category.save();

  res.send(category);
});

router.put("/:id", [auth, admin], validateBody, async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  res.send(category);
});

module.exports = router;
