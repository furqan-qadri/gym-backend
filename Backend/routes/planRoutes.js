const express = require("express");
const {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/plansController");

//creating router object
const router = express.Router();

//get all students list get
router.post("/create", createPlan);
router.get("/getall", getAllPlans);
router.get("/:id", getPlanById);

//update by id
router.put("/update/:id", updatePlan);
router.delete("/delete/:id", deletePlan);
// router.get("/getplandetails", getPlanDetails);

module.exports = router;
