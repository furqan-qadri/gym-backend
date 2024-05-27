const express = require("express");
const {
  getAnnouncements,
  getAnnouncementById,
} = require("../controllers/announcementController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getAnnouncements);
//get by id
router.get("/:id", getAnnouncementById);

//update by id
// router.put("/update/:id", editStudent);
// router.delete("/delete/:id", deleteMember);
// router.post("/create", createMember);
// router.get("/getplandetails", getPlanDetails);

module.exports = router;
