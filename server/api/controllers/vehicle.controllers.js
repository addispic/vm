// models
const VehicleMode = require("../models/vehicle.schema")
// get all vehicles
const getAllVehicles = async (req,res) => {
    try {
            const vehicles = await VehicleMode.find().sort({createdAt: -1});
            return res.status(200).json({vehicles})
        } catch (err) {
            return res.status(400).json({error: 'get all vehicles error'});
        }
}

// add new vehicle
const addNewVehicle = async (req,res) => {
    try {
        console.log(req.body)
        const newVehicle = await VehicleMode.create({userId: req.user?._id,name: req.body.name,status: req.body.status,image: req.file.path})
        return res.status(200).json({newVehicle})
    } catch (err) {
        return res.status(400).json({error: 'new vehicle failed'})
    }
}

// update vehicle
const updateVehicle = async (req,res) => {
    try {
        const vehicleId = req.params._id;
        const userId = req.user?._id;
        const {name,status} = req.body 
        const newImage = req.file?.path
        const vehicle = await VehicleMode.findById(vehicleId)
        if(!vehicle){
            return res.status(400).json({error: 'vehicle not exist'});
        }
        if(!vehicle?.userId?.equals(userId)){
            return res.status(400).json({error: 'unauthorized to update vehicle'})
        }
        if(newImage){

            const updatedVehicle = await VehicleMode.findByIdAndUpdate(vehicleId,{name,status,image: newImage},{new: true})
            return res.status(200).json({updatedVehicle})
        }else{

            const updatedVehicle = await VehicleMode.findByIdAndUpdate(vehicleId,{name,status},{new: true})
            return res.status(200).json({updatedVehicle})
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: 'update vehicle error'});
    }
}

// delete vehicle
const deleteVehicle = async (req,res) => {
    try {
        const vehicleId = req.params._id 
        const userId = req.user?._id 
        const vehicle = await VehicleMode.findById(vehicleId);
        if(!vehicle){
            return res.status(200).json({error: 'vehicle not exist'});
        }

        if(!vehicle?.userId?.equals(userId)){
            return res.status(400).json({error: 'unauthorized to delete the vehicle'})
        }

        await VehicleMode.findByIdAndDelete(vehicleId);
        if(vehicle?.files?.length > 0){
            vehicle?.files?.forEach((filePath)=>{
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
            })
        }
        return res.status(200).json({message: 'vehicle deleted successfully',_id: vehicleId})
    } catch (err) {
        console.log(err)
        return res.status(200).json({error: 'delete vehicle error'});
    }
}

// exports
module.exports = {
    getAllVehicles,
    addNewVehicle,
    updateVehicle,
    deleteVehicle,
}