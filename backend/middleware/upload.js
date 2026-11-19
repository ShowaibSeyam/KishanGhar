const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for crop detection images
const cropStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kishanghar/crop-detection',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1024, height: 1024, crop: 'limit', quality: 'auto' }],
  },
});

// Storage for animal detection images
const animalStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kishanghar/animal-detection',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1024, height: 1024, crop: 'limit', quality: 'auto' }],
  },
});

// Storage for profile avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kishanghar/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 300, height: 300, crop: 'fill', gravity: 'face', quality: 'auto' }],
  },
});

// File filter — images only
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Max file size: 10MB
const limits = { fileSize: 10 * 1024 * 1024 };

module.exports = {
  uploadCropImage: multer({ storage: cropStorage, fileFilter: imageFilter, limits }).single('image'),
  uploadAnimalImage: multer({ storage: animalStorage, fileFilter: imageFilter, limits }).single('image'),
  uploadAvatar: multer({ storage: avatarStorage, fileFilter: imageFilter, limits }).single('avatar'),
  cloudinary,
};
