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

const editStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or provide ID",
      });
    }

    const { name, email, medium } = req.body;

    const data = await db.query(
      `update student set name=?, email=?, medium=? where id=?`,
      [name, email, medium, studentId]
    );

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Provide necessary fields- Data error",
      });
    }

    res.status(200).send({
      success: true,
      message: "Record updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating student record",
      error: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const memberID = req.params.id;
    console.log(memberID);
    if (!memberID) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID",
      });
    }
    const data = await db.query(`DELETE FROM members WHERE member_id = ?`, [
      memberID,
    ]);

    if (data.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No member found with the given ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Member deleted successfully",
      student: data[0],
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting member",
      error: error.message,
    });
  }
};

const getPlanDetails = async (req, res) => {
  try {
    // Query to get total number of members associated with plan_id = 1
    const [totalMembersPlan1] = await db.query(
      "SELECT COUNT(*) AS total_members_plan_1 FROM Members WHERE plan_id = 3"
    );
    // Query to get total number of members
    const [totalMembers] = await db.query(
      "SELECT COUNT(*) AS total_members FROM Members"
    );
    // Query to get cost of plan_id = 1
    const [plan1Cost] = await db.query(
      "SELECT cost FROM Plans WHERE plan_id = 3"
    );

    const adoption =
      (totalMembersPlan1[0].total_members_plan_1 /
        totalMembers[0].total_members) *
      100;

    const revenueLastMonth =
      plan1Cost[0].cost * totalMembersPlan1[0].total_members_plan_1;

    res.status(200).json({
      success: true,
      activeMembers: totalMembersPlan1[0].total_members_plan_1,
      revenueLastMonth: revenueLastMonth,
      adoption: adoption.toFixed(1),
      plan1Cost: plan1Cost[0] ? plan1Cost[0].cost : null,
    });
  } catch (error) {
    console.error("Error in getMemberStats:", error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving member stats",
      error: error.message,
    });
  }
};

module.exports = {
  getMembers,
  getMemberbyId,
  createMember,
  editStudent,
  deleteMember,
  getPlanDetails,
};
