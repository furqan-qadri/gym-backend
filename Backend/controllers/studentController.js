//get all student list

const db = require("../config/db");

const getStudents = async (req, res) => {
  try {
    const data = await db.query("select * from student");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All students records",
      students: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get students API",
      error,
    });
  }
};

//get student by id

const getStudentbyID = async (req, res) => {
  try {
    const studentId = req.params.id; //should be same as server file
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Student ID invalid",
      });
    }
    const data = await db.query(`select * from student where id=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      studentDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET student by ID",
      error,
    });
  }
};

const createStudent = async (req, res) => {
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

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log(studentId);
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID",
      });
    }
    const data = await db.query(`DELETE FROM student WHERE id = ?`, [
      studentId,
    ]);

    if (data.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No student found with the given ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student deleted successfully",
      student: data[0],
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
};

module.exports = {
  getStudents,
  getStudentbyID,
  createStudent,
  editStudent,
  deleteStudent,
};
