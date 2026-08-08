const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    generateQuestions
} = require("../controllers/interviewController");

router.post(
    "/generate",
    authMiddleware,
    generateQuestions
);

module.exports = router;