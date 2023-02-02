import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = async (file, folder) => {
  const uploadResponse = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: folder,
  });

  return uploadResponse;
};

export default uploads;
