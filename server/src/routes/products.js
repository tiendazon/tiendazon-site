const express = require("express");
const {
  Product,
  validateBody,
  upload,
  removeImage,
} = require("../models/product");
const { Category } = require("../models/category");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});

  res.send(products);
});

router.post("/", upload.single("image"), validateBody, async (req, res) => {
  const { name, price, categoryId } = req.body;
  const { path: image, filename: cloudinaryId } = req.file;

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send("Categoría no encontrada");

  const product = new Product({ name, price, category, image, cloudinaryId });
  await product.save();

  res.send(product);
});

router.put("/:id", upload.single("image"), validateBody, async (req, res) => {
  const { name, price, categoryId } = req.body;
  const { path: image, filename: cloudinaryId } = req.file;

  let product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Producto no encontrado");

  await removeImage(product.cloudinaryId);

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send("Categoría no encontrada");

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, category, image, cloudinaryId },
    { new: true }
  );

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(400).send("Producto no encontrado");

  await removeImage(product.cloudinaryId);

  res.send(product);
});

module.exports = router;
