import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;
    // upload the file to Cloudinary
    const response = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          throw new Error(error);
        }
        return result;
      }
    ).end(fileBuffer);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary };
