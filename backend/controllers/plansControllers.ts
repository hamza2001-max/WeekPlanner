export {};
const mongoose = require("mongoose");
const Plan = require("../models/plansModel");

interface PlanInterface {
  _id: number;
  title: string;
  dueDate: string;
  description?: string;
}

const getAllPlans = async (req: any, res: any) => {
  const allPlans = await Plan.find().sort({ createdAt: -1 });
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

const updatePlan = async (req: any, res: any) => {
  // console.log("update start");
  const { newTitle, newDueDate, newDescription } = req.body;
  console.log(newTitle, newDueDate, newDescription );
  
  const {id} = req.params;
  console.log(id);
  try {
    await Plan.findById(id, (error: Error, newPlan: any) => {
      // console.log(" first hey");
      if (newPlan) {
        newPlan.title = newTitle;
        newPlan.dueDate = newDueDate;
        newPlan.description = newDescription;
        // console.log(" lasthey");
        newPlan.save();
        if (error) {
          return res.status(400).json(error);
        }
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
  console.log("update end");
  return res.status(200).json(`Successfully Updated`);
};

module.exports = { getAllPlans, updatePlan, postPlan, deletePlan };
