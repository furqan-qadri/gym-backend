const express = require("express");
const {
  createSalary,
  updateSalary,
  deleteSalary,
  getAllSalaries,
  getSalaryById,
  getSalariesByTrainerId,
} = require("../controllers/salariesController");



//creating router object
const router = express.Router();

router.get("/getall", getAllSalaries);
router.get("/:id", getSalaryById);
router.delete("/delete/:id", deleteSalary);
router.put("/update/:id", updateSalary);
router.get("/trainer/:id", getSalariesByTrainerId);
router.post("/create", createSalary);

module.exports = router;
