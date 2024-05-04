const express = require("express");
const {
  getStudents,
  getStudentbyID,
  createStudent,
  editStudent,
} = require("../controllers/studentController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getStudents);
//get by id
router.get("/get/:id", getStudentbyID);

//update by id
router.put("/update/:id", editStudent);

router.post("/create", createStudent);

module.exports = router;
