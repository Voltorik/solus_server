const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const doesUserExist = require('../../middleware/doesUserExist');

router
    .route('/:userID')
    .get(doesUserExist, userController.getUser)
    .patch(doesUserExist, userController.patchUser)
    .delete(doesUserExist, userController.deleteUser);

module.exports = router;