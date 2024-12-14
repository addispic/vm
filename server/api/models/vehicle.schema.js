const mongoose = require("mongoose");

// schema
// post schema
const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "text content required"],
    },
    status: {
        type: String,
        required: true
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// exports
module.exports =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
