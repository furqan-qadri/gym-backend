const express = require("express");
const {
  getAnnouncements,
  getAnnouncementById,
  deleteAnnouncement,
  createAnnouncement,
  updateAnnouncement,
} = require("../controllers/announcementController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getAnnouncements);
router.post("/create", createAnnouncement);
//get by id
router.get("/:id", getAnnouncementById);
router.delete("/:id", deleteAnnouncement);
router.put("/:id", updateAnnouncement);

//update by id
// router.put("/update/:id", editStudent);
// router.delete("/delete/:id", deleteMember);
// router.post("/create", createMember);
// router.get("/getplandetails", getPlanDetails);

module.exports = router;
