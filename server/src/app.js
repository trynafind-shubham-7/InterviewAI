const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const historyRoutes = require("./routes/historyRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const profileRoutes = require("./routes/profileRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Welcome to InterviewAI API 🚀"
    });

});

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/evaluation", evaluationRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/report", reportRoutes);

app.use(errorHandler);

module.exports = app;