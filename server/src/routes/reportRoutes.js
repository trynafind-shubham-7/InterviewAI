const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    generateReport,
    getReport
} = require("../controllers/reportController");

router.post(
    "/",
    authMiddleware,
    generateReport
);

router.get(
    "/:id",
    authMiddleware,
    getReport
);

module.exports = router;