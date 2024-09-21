const multer = require("multer");
const { extname, resolve } = require("path");


const aleatoria = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
   
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new multer.MulterError("Arquivo precisa ser png ou jpeg"));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads","image"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatoria()}${extname(file.originalname)}`);
    },
    limits: {
        fileSize: 1 * 1024 * 1024
      },
  }),
};
