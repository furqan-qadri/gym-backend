//get all student list

const db = require("../config/db");

const getMembers = async (req, res) => {
  try {
    const data = await db.query("select * from members");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All members records",
      members: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get members API",
      error,
    });
  }
};

//get student by id

const getMemberbyId = async (req, res) => {
  try {
    const memberId = req.params.id; //should be same as server file
    if (!memberId) {
      return res.status(404).send({
        success: false,
        message: "Member ID invalid",
      });
    }
    const data = await db.query(`select * from members where member_id=?`, [
      memberId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      memberDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET member by ID",
      error,
    });
  }
};

//create a member

const createMember = async (req, res) => {
  try {
    const { name, email, medium } = req.body;

    if (!name || !email || !medium) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const data = await db.query(
      `INSERT INTO student (name, email, medium) VALUES (?, ?, ?)`,
      [name, email, medium]
    );

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in Insert query",
      });
    }

    res.status(201).send({
      success: true,
      message: "Student created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error creating student",
      error,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;

    if (!memberId) {
      return res.status(400).send({
        success: false,
        message: "Member ID is required",
      });
    }

    // Delete attendance records associated with the member
    await db.query("DELETE FROM Attendance WHERE member_id = ?", [memberId]);

    // Delete payment records associated with the member
    await db.query("DELETE FROM Payments WHERE member_id = ?", [memberId]);

    // Then delete the member
    const result = await db.query("DELETE FROM Members WHERE member_id = ?", [memberId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting member",
      error,
    });
  }
};




module.exports = {
  getMembers,
  getMemberbyId,
  createMember,
  deleteMember,
};
