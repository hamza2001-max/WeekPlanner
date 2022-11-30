export {};
const mongoose = require("mongoose");
const Plan = require("../models/plansModel");

const getAllPlans = async (req: any, res: any) => {
  const allPlans = await Plan.find().sort({ createdAt: -1 });
  res.status(200).json(allPlans);
};

const getSinglePlan = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Wrong id format." });
  }
  const plan = await Plan.findById(id);
  if (!plan) {
    res.status(400).json({ error: "Such plan does not exists." });
  }
  res.status(200).json(plan);
};

const postPlan = async (req: any, res: any) => {
  const { title, dueDate, description } = req.body;
  const emptyfield = [];
  if (!title) {
    emptyfield.push("title");
  }
  if (!dueDate) {
    emptyfield.push("dueDate");
  }
  if (emptyfield.length > 0) {
    return res
      .status(400)
      .json({ error: "Fill all of the fields please.", emptyfield });
  }
  try {
    const plan = await Plan.create({ title, description, dueDate });
    res.status(200).json(plan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deletePlan = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Wrong id format." });
  }
  const del = await Plan.findOneAndDelete({ _id: id });
  if (!del) {
    res.status(400).json({ error: "No such id." });
  }
  res.status(200).json(del);
};

module.exports = { getAllPlans, getSinglePlan, postPlan, deletePlan };