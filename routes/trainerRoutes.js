const express = require("express");
const {
  getTrainers,
  getTrainerbyId,
  deleteTrainer,
  createTrainer,
  updateTrainer,
} = require("../controllers/trainerController");

//creating router object
const router = express.Router();

//get all students list get
router.post("/create", createTrainer);
router.get("/getall", getTrainers);
router.get("/:id", getTrainerbyId);
router.put("/update/:id", updateTrainer);
router.delete("/delete/:id", deleteTrainer);

module.exports = router;
