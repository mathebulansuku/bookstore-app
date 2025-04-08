import express from "express";
import cloudinary from "./lib/cloudinary.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;
  } catch (error) {}
});

export default router;
