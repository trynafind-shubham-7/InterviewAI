const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const register = async (name, email, password) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        const error = new Error("Email already registered");
error.statusCode = 400;
throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return user;
};

module.exports = {
    register
};