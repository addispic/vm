const jwt = require('jsonwebtoken');

// model
// user
const User = require('../models/user.schema');

// private route
const privateRoute = async (req,res,next) => {
    try{
        // toke
        const token = req.cookies.token 
        if(!token){
            return res.status(400).json({error: 'unauthorized'});
        }

        // decoded token
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(400).json({error: 'unauthorized'});
        }

        // is user
        const isUser = await User.findById(decodedToken?._id);

        if(!isUser){
            return res.status(400).json({error: 'unauthorized'});
        }

        req.user = {
            _id: isUser?._id,
            username: isUser?.username,
            email: isUser?.email
        }
        next()
    }catch(err){
        console.log(err);
        return res.status(400).json({
            error: 'unauthorized',
        })
    }
}

// exports
module.exports = {
    privateRoute,
}