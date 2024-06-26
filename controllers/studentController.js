//get all student list

const db = require("../config/db");

const getMembers = async (req, res) => {
  try {
    const data = await db.query("select * from Members");
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
    const data = await db.query(`select * from Members where member_id=?`, [
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
    const result = await db.query("DELETE FROM Members WHERE member_id = ?", [
      memberId,
    ]);

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

const createMember = async (req, res) => {
  try {
    const {
      full_name,
      age,
      sex,
      IC_Passport,
      phone,
      email_id,
      address,
      sign_up_date,
      plan_id,
      trainer_id,
    } = req.body;

    // Check if required fields are provided
    if (
      !full_name ||
      !age ||
      !sex ||
      !IC_Passport ||
      !phone ||
      !email_id ||
      !address ||
      !sign_up_date
    ) {
      return res.status(400).send({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Insert the new member into the database without date_of_birth
    const result = await db.query(
      "INSERT INTO Members (full_name, age, sex, IC_Passport, phone, email_id, address, sign_up_date, plan_id, trainer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        full_name,
        age,
        sex,
        IC_Passport,
        phone,
        email_id,
        address,
        sign_up_date,
        plan_id,
        trainer_id,
      ]
    );

    res.status(201).send({
      success: true,
      message: "Member created successfully",
      memberId: result[0].insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating member",
      error,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const fieldsToUpdate = req.body;

    // Check if memberId is provided
    if (!memberId) {
      return res.status(400).send({
        success: false,
        message: "Member ID is required",
      });
    }

    // Build the dynamic update query based on the fields provided
    let query = "UPDATE Members SET";
    let queryParams = [];
    Object.keys(fieldsToUpdate).forEach((field, index) => {
      query += ` ${field} = ?`;
      if (index < Object.keys(fieldsToUpdate).length - 1) {
        query += ",";
      }
      queryParams.push(fieldsToUpdate[field]);
    });
    query += " WHERE member_id = ?";
    queryParams.push(memberId);

    // Update the member in the database
    const result = await db.query(query, queryParams);

    if (result[0].affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Member not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Member updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating member",
      error,
    });
  }
};

module.exports = {
  getMembers,
  getMemberbyId,
  createMember,
  deleteMember,
  updateMember,
};
