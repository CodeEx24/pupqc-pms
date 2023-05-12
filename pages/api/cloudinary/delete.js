// Import Cloudinary
const cloudinary = require('cloudinary');

// Function to delete image from Cloudinary
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req, res) => {
  const publicId = req.body.public_id;

  cloudinary.v2.uploader.destroy(publicId, function (error, result) {
    console.log(result, error);
  });

  res.json({ message: 'User image deleted successfully' });
};

export default handler;
