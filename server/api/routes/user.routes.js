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

// middlewares
// auth middleware
const {privateRoute} = require('../middlewares/auth.middleware')

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
router.get('/auth-checker',privateRoute,authChecker)

// exports
module.exports = router;