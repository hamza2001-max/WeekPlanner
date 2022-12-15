export {};
const mongoose = require("mongoose");
const Plan = require("../models/plansModel");

// interface PlanInterface {
//   _id: number;
//   title: string;
//   dueDate: string;
//   description?: string;
// }

const getAllPlans = async (req: any, res: any) => {
  const userId = req.user?._id;
  const allPlans = await Plan.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(allPlans);
};

// const getSinglePlan = async (req: any, res: any) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ error: "Wrong id format." });
//   }
//   const plan = await Plan.findById(id);
//   if (!plan) {
//     res.status(400).json({ error: "Such plan does not exists." });
//   }
//   res.status(200).json(plan);
// };

const postPlan = async (req: any, res: any) => {
  const userId = req.user?._id;
  // console.log(userId);
  const { title, dueDate, description } = req.body;

  const emptyfields = [];
  if (!title) {
    emptyfields.push("Title");
  }
  if (!dueDate) {
    emptyfields.push("DueDate");
  }
  if (emptyfields.length > 0) {
    return res
      .status(400)
      .json({ error: "Fill all of the fields:", emptyfields });
  }
  try {
    console.log(userId);
    const plan = await Plan.create({ title, description, dueDate, userId });
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

const updatePlan = async (req: any, res: any) => {
  const { newTitle, newDueDate, newDescription } = req.body;
  const { id } = req.params;
  Plan.findById({ _id: id }, async (error: Error, newPlan: any) => {
    if (error) {
      return res.status(400).json(error);
    }
    newPlan.title = await newTitle;
    newPlan.dueDate = await newDueDate;
    newPlan.description = await newDescription;
    await newPlan.save();
  });
};

module.exports = { getAllPlans, updatePlan, postPlan, deletePlan };
