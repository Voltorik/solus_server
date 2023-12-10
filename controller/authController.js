const { User } = require('../model/userSchema');
const jwt = require('jsonwebtoken');

const _generateJWTToken = (user) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' }); // Token expires in 1 week
    return token;
};

const addRegisteredUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { username, email, password } = req?.body;
    // Check if all fields are filled
    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'username, email, and password request variables are required',
        });
    }

    try {
        // Make a new user via the User schema template
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        });

        const token = _generateJWTToken(user);
        res.status(201).json({
            message: 'User successfully created.',
            user: user,
            token: token,
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Could not register user.',
            error: err.message,
        });
    }
};

const loginUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { email, password } = req?.body;

    if (!email || !password) {
        return res
            .status(401)
            .json({ error: 'Email and password are required.' });
    }

    try {
        // Find user in database
        const loginInfo = await User.findOne({
            email,
            password,
        });

        // If user exists, return user info
        if (loginInfo) {
            const token = _generateJWTToken(loginInfo);
            return res.status(200).json({
                message: `User logged in.`,
                login: loginInfo,
                token: token,
            });
        } else {
            return res.status(404).json({
                message: `User not found.`,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Could not login user.',
            err: err.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: `User has logged out.`,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Could not log out.',
            error: err.message,
        });
    }
};

module.exports = {
    addRegisteredUser,
    loginUser,
    logoutUser,
};