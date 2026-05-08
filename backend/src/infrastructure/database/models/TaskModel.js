const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pendiente", "en progreso", "completada"],
      default: "pendiente",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // query by userId frequently
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
