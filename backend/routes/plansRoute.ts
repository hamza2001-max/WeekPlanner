export {};
import { authorization } from "../middlewares/authorization";
const express = require("express");
const {
  getAllPlans,
  updatePlan,
  postPlan,
  deletePlan,
} = require("../controllers/plansControllers");

const router = express.Router();
router.use(authorization);
router.get("/", getAllPlans);
router.put("/:id", updatePlan);
router.post("/", postPlan);
router.delete("/:id", deletePlan);

module.exports = router;
