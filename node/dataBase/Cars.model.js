const { Schema, model } = require("mongoose");

const Car = new Schema(
  {
    model: { type: String, trim: true, required: true },
    year: { type: Number, required: true },
    owner: { type: String, default: "Nobody" },
  },
  { timestamps: false }
);

module.exports = model("Car", Car);
