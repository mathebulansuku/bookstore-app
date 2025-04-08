import express from "express";
import cloudinary from "./lib/cloudinary.js";
import Book from "./models/Book.js";
import protectRoute from "./middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save(); //save the book to the database

    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    // populate - Gets the username and userId
    // skip - Jumps the previous query to give the next requested page limit

    const totalBooks = await Book.countDocuments();
    res.send({
      books,
      currentPage: page,
      totalBooks: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error getting books", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
