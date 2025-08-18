const express = require('express');
const router = express.Router();
const UserModel = require('../Models/UserModels');
const userController = require('../Controlers/UserController'); 

router.get('/',userController.getAllUsers);
router.post('/',userController.addUser);
router.get('/:id',userController.userById);
router.put('/:id',userController.updateUSer);
router.delete('/:id',userController.deleteUser);

module.exports = router;