const db = require("../config/db");

const getAnnouncements = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Announcements");
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No announcements found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All announcements",
      announcements: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get announcements API",
      error,
    });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcementId = req.params.id; // should be same as server file
    if (!announcementId) {
      return res.status(404).send({
        success: false,
        message: "Announcement ID invalid",
      });
    }
    const data = await db.query(
      "SELECT * FROM Announcements WHERE announcement_id = ?",
      [announcementId]
    );
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No announcement found",
      });
    }
    res.status(200).send({
      success: true,
      announcementDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET announcement by ID",
      error,
    });
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncementById,
};
