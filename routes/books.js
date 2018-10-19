const express = require("express");
const router = express.Router();
const Book = require("../models/books");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const result = await Book.find().populate("author");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Book.find({ _id: req.params.id }).populate("author");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });
    await newBook.save();
    res.status(201).json({
      message: `${req.body.title} was successfully created`
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author
      },
      {
        new: true
      }
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Book.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
