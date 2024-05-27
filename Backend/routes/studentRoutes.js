const express = require("express");
const {
  getMembers,
  getMemberbyId,
  createMember,
  editStudent,
  deleteMember,
  getPlanDetails,
} = require("../controllers/studentController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getMembers);
//get by id
router.get("/:id", getMemberbyId);

//update by id
router.put("/update/:id", editStudent);
router.delete("/delete/:id", deleteMember);
router.post("/create", createMember);
router.get("/getplandetails", getPlanDetails);

module.exports = router;
