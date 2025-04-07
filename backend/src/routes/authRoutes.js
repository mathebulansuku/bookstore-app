import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", (req, res) => {
  res.send("Register");
});

export default router;
