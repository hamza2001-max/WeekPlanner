export {};
const express = require("express");
const {
  getAllPlans,
  updatePlan,
  postPlan,
  deletePlan,
} = require("../controllers/plansControllers");

const router = express.Router();
router.get("/", getAllPlans);
router.put("/:id", updatePlan);
router.post("/", postPlan);
router.delete("/:id", deletePlan);

module.exports = router;
