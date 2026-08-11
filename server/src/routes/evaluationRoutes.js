const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    evaluate
} = require("../controllers/evaluationController");

router.post(
    "/",
    authMiddleware,
    evaluate
);

module.exports = router;