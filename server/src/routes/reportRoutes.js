const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    generateReport
} = require("../controllers/reportController");

router.post(
    "/",
    authMiddleware,
    generateReport
);

module.exports = router;