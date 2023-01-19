const express = require("express");
const {
  Product,
  validateBody,
  validateUpdateBody,
  upload,
  removeImage,
} = require("../models/product");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});

  res.send(products);
});

router.get("/:id", [auth, admin], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Producto no encontrado");

    res.send(product);
  } catch (err) {
    if (err.kind === "ObjectId") res.status(400).send("Producto no valido");
  }
});

router.post(
  "/",
  [auth, admin],
  upload.single("image"),
  validateBody,
  async (req, res) => {
    const { name, price, categoryId } = req.body;
    const { path: image, filename: cloudinaryId } = req.file;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send("Categoría no encontrada");

    const product = new Product({ name, price, category, image, cloudinaryId });
    await product.save();

    res.send(product);
  }
);

router.put(
  "/:id",
  [auth, admin],
  upload.single("image"),
  validateUpdateBody,
  async (req, res) => {
    const { name, price, categoryId } = req.body;

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send("Producto no encontrado");

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send("Categoría no encontrada");

    let body = { name, price, category };

    if (req.file) {
      const { path: image, filename: cloudinaryId } = req.file;
      body = { ...body, image, cloudinaryId };

      await removeImage(product.cloudinaryId);
    }

    product = await Product.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    res.send(product);
  }
);

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(400).send("Producto no encontrado");

  if (product.cloudinaryId) await removeImage(product.cloudinaryId);

  res.send(product);
});

module.exports = router;
