import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        // Validate file type and size
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.mimetype)) {
          return reject(new Error("Invalid file type"));
        }

        if (file.size > maxSize) {
          return reject(new Error("File size exceeds 5MB"));
        }

        cloudinary.uploader.upload(
          file.path,
          {
            folder: "hostel_images",
            transformation: [
              { width: 1200, crop: "limit" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              // Use async file deletion
              fs.unlink(file.path, (unlinkError) => {
                if (unlinkError) {
                  console.warn("Error deleting local file:", unlinkError);
                }
              });
              resolve(result.secure_url);
              console.log(result);
            }
          }
        );
      });
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    res.status(200).json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: error.message || "Image upload failed",
      details: error.toString(),
    });
  }
};
