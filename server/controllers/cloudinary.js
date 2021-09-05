const status = require('http-status');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: uuidv4(),
      resource_type: 'auto', // jpeg, png
    });

    res.status(status.OK).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const image_id = req.body.public_id;

    const { result } = await cloudinary.uploader.destroy(image_id);

    if (result !== 'ok') {
      return res
        .status(status.BAD_REQUEST)
        .json({ result, message: 'Remove image error' });
    }

    res.status(status.OK).json({ success: true });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, error });
  }
};
