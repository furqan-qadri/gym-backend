const express = require("express");
const {
  getTrainers,
  getTrainerbyId,
} = require("../controllers/trainerController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getTrainers);
//get by id
router.get("/:id", getTrainerbyId);

//update by id
// router.put("/update/:id", editStudent);
// router.delete("/delete/:id", deleteMember);
// router.post("/create", createMember);
// router.get("/getplandetails", getPlanDetails);

module.exports = router;
