const authService = require("../services/authService");

const jwt = require("jsonwebtoken");

const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

const user = await authService.register(
    name,
    email,
    password
);

return res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    }
});

    } catch (error) {
    next(error);
}

};

const loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
    next(error);
}

};

const getProfile = async (req, res, next) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            }
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
    next(error);
}

};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};
