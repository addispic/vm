const mongoose = require('mongoose');

// schema
// post schema
const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: [true,'text content required'],
    },

},{timestamps: true});

// exports
module.exports = mongoose.models.Post || mongoose.model('Post',postSchema);