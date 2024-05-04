const express = require("express");
const {
  getStudents,
  getStudentbyID,
  createStudent,
} = require("../controllers/studentController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getStudents);
//get by id
router.get("/get/:id", getStudentbyID);

router.post("/create", createStudent);

module.exports = router;
