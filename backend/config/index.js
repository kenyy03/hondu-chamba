require('dotenv').config();

exports.config = {
  ATLAS_USERNAME: process.env.ATLAS_USERNAME,
  ATLAS_PASSWORD: process.env.ATLAS_PASSWORD,
  ATLAS_DATABASE: process.env.ATLAS_DATABASE,
  URL_PREFIX: process.env.URL_PREFIX,
  PORT: process.env.PORT,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}