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

const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: "Please provide both title and content",
      });
    }

    const query = "INSERT INTO Announcements (title, content) VALUES (?, ?)";
    const values = [title, content];

    const result = await db.query(query, values);

    res.status(201).send({
      success: true,
      message: "Announcement created successfully",
      announcementId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating announcement",
      error,
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.id;

    if (!announcementId) {
      return res.status(400).send({
        success: false,
        message: "Announcement ID is required",
      });
    }

    const query = "DELETE FROM Announcements WHERE announcement_id = ?";
    const result = await db.query(query, [announcementId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No announcement found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting announcement",
      error,
    });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.id;
    const { title, content } = req.body;

    if (!announcementId) {
      return res.status(400).send({
        success: false,
        message: "Announcement ID is required",
      });
    }

    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: "Please provide both title and content",
      });
    }

    const query =
      "UPDATE Announcements SET title = ?, content = ? WHERE announcement_id = ?";
    const values = [title, content, announcementId];

    const result = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No announcement found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Announcement updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating announcement",
      error,
    });
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
};
