export {};
const express = require("express");
const {
  getAllPlans,
  getSinglePlan,
  postPlan,
  deletePlan,
} = require("../controllers/plansControllers");

const router = express.Router();
router.get("/", getAllPlans);
router.get("/:id", getSinglePlan);
router.post("/", postPlan);
router.delete("/:id", deletePlan);

module.exports = router;
