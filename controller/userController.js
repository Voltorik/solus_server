const { User } = require('../model/userSchema');

const getUser = async (req, res) => {
    const userID = req.params.userID;
    if (!userID) {
        // 400 Bad Request
        return res.status(400).json({
            error: 'userID request variable is required',
        });
    }
    try {
        // Find user via built in schema function
        const user = await User.findById(userID);

        if (user) {
            // 200 OK
            return res.status(200).json({
                message: 'User found.',
                user: user,
            });
        } else {
            // 404 Not Found
            return res.status(404).json({
                message: 'User not found.',
            });
        }
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ error: err.message });
    }
};

// Update User info from the req.user and req.filter variables. 
const patchUser = async (req, res) => {
    const userID = req.params.userID;
    const { new_username, new_email, new_password} = req?.body;

    // User data to update if included
    let filter = {};
    if (new_username) filter.username = new_username;
    if (new_email) filter.email = new_email;
    if (new_password) filter.password = new_password;

    // Don't send a DB request if there are no values to update
    if (Object.keys(filter).length === 0) {
        return res.status(400).json({
            message: 'No user values provided to update.',
        });
    }

    try {
        let user = await User.findOneAndUpdate({ _id: userID }, filter, {
            new: true,
        });
        return res.status(200).json({
            message: `User values ${Object.keys(filter)} updated.`,
            currentUserInfo: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error updating User info',
            error: err.message,
        });
    }
};

const deleteUser = async (req, res) => {
    const userID = req.params.userID;
    try {
        // Delete user via built in schema function
        const user = await User.deleteOne({_id: userID});

        return res.status(200).json({
            message: 'User has been deleted.',
            userID_deleted: userID,
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getUser,
    patchUser,
    deleteUser,
};