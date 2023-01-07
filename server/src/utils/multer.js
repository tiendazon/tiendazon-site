const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

module.exports = (validateFile) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "products",
        format: async (req, file) => "png",
        public_id: (req, file) => uuidv4(),
      },
    }),
    fileFilter: function (req, file, cb) {
      cb(null, validateFile(file.mimetype));
    },
  });
