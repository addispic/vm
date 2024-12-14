const {Router} = require('express');

// middlewares
// private route
const {privateRoute} = require('../middlewares/auth.middleware');
// vehicle middler
const {vehicleMiddleware} = require("../middlewares/vehicle.middleware")

// controllers
const {
    getAllVehicles,
    addNewVehicle,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicle.controllers')


// router
const router = Router();

// get all post
router.get('/get-all-vehicles',getAllVehicles)

// add new post
router.post('/new-vehicle',privateRoute,vehicleMiddleware.single("image"),addNewVehicle)

// update single post
router.put('/update-vehicle/:_id',privateRoute,vehicleMiddleware.single("image"),updateVehicle)

// delete post
router.delete('/delete-vehicle/:_id',privateRoute,deleteVehicle)


// exports
module.exports = router;