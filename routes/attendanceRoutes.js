const express = require("express");
const {
  createAttendance,
  getAttendanceByMemberId,
  deleteAttendance,
  updateAttendance,
} = require("../controllers/attendanceController");

//creating router object
const router = express.Router();

//get all students list get
// router.get("/getall", createAttendance);
router.post("/create", createAttendance);
router.get("/member/:id", getAttendanceByMemberId);

//update by id
router.put("/update/:id", updateAttendance);
router.delete("/delete/:id", deleteAttendance);
// router.get("/getplandetails", getPlanDetails);

module.exports = router;
