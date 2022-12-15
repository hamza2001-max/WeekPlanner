export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plansSchema = new Schema(
  {
    title: {
      type: "string",
      required: "true",
    },
    dueDate: {
      type: "string",
      required: "true",
    },
    description: {
      type: "string",
    },
    userId: {
      type: "string",
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("plan", plansSchema);
