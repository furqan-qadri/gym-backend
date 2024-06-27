const db = require("../config/db");

const createAttendance = async (req, res) => {
  try {
    const { member_id, attendance_date } = req.body;

    if (!member_id || !attendance_date) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields",
      });
    }

    // Insert the new attendance record into the Attendance table
    await db.query(
      "INSERT INTO Attendance (member_id, attendance_date) VALUES (?, ?)",
      [member_id, attendance_date]
    );

    res.status(200).send({
      success: true,
      message: "Attendance recorded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in recording attendance",
      error,
    });
  }
};

const getAllAttendances = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Attendance");
    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "No attendance records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All attendance records",
      attendances: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all attendance records",
      error,
    });
  }
};

const getAttendanceByMemberId = async (req, res) => {
  try {
    const memberId = req.params.id;
    if (!memberId) {
      return res.status(400).send({
        success: false,
        message: "Member ID is required",
      });
    }

    const data = await db.query(
      "SELECT * FROM Attendance WHERE member_id = ?",
      [memberId]
    );
    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "No attendance records found for the specified member",
      });
    }

    res.status(200).send({
      success: true,
      message: `Attendance records for member ID ${memberId}`,
      attendances: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting attendance records for the specified member",
      error,
    });
  }
};

// The following update and delete functions could be modified to adjust to your attendance system specifics.
const updateAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    if (!attendanceId) {
      return res.status(400).send({
        success: false,
        message: "Attendance ID is required",
      });
    }

    const fieldsToUpdate = req.body;

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({
        success: false,
        message: "No fields provided to update",
      });
    }

    const setClauses = [];
    const queryParams = [];
    Object.keys(fieldsToUpdate).forEach((field) => {
      setClauses.push(`${field} = ?`);
      queryParams.push(fieldsToUpdate[field]);
    });

    const query = `UPDATE Attendance SET ${setClauses.join(
      ", "
    )} WHERE attendance_id = ?`;
    queryParams.push(attendanceId);

    const result = await db.query(query, queryParams);

    if (result[0].affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Attendance not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Attendance updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating attendance",
      error,
    });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    if (!attendanceId) {
      return res.status(400).send({
        success: false,
        message: "Attendance ID is required",
      });
    }

    const result = await db.query(
      "DELETE FROM Attendance WHERE attendance_id = ?",
      [attendanceId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting attendance",
      error,
    });
  }
};

module.exports = {
  createAttendance,
  getAttendanceByMemberId,
  getAllAttendances,
  deleteAttendance,
  updateAttendance,
};
