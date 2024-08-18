const {Router} = require('express');

// controllers
// user
const {
    getAllUsers,
    userRegister,
    userLogin,
    userLogout,
    authChecker,
} = require('../controllers/user.controllers')

// router
const router = Router();

// get all users
router.get('/get-all-users',getAllUsers)

// register
router.post('/register',userRegister)

// login
router.post('/login',userLogin)

// login
router.get('/logout',userLogout)

// auth checker
router.get('/auth-checker',authChecker)

// exports
module.exports = router;