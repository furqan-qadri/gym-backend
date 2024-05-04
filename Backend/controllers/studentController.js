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

module.exports = { getStudents, getStudentbyID };
