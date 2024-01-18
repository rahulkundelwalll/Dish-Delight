import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage(); 

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'), false);
    }
  },
}).single("image");

const uploadCompressedImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    req.compressedImageBuffer = await sharp(req.file.buffer)
      .toBuffer();

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

const updateCompressedImage = async (req, res, next) => {
  try {
    if (req.file) {
      req.compressedImageBuffer = await sharp(req.file.buffer)
      .toBuffer();
    }
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
};



export { upload, uploadCompressedImage,updateCompressedImage};
