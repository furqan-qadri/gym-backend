// salariesController.js
const db = require("../config/db");
const createSalary = async (req, res) => {
  try {
    const { trainerId, salaryMonth, salaryYear, amount } = req.body;

    // Check if required fields are provided
    if (!trainerId || !salaryMonth || !salaryYear || !amount) {
      return res.status(400).send({
        success: false,
        message:
          "Trainer ID, salary month, salary year, and amount are required fields",
      });
    }

    // Insert the new salary into the database
    const result = await db.query(
      "INSERT INTO Salaries (trainer_id, salary_month, salary_year, amount) VALUES (?, ?, ?, ?)",
      [trainerId, salaryMonth, salaryYear, amount]
    );

    res.status(201).send({
      success: true,
      message: "Salary created successfully",
      salaryId: result[0].insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating salary",
      error,
    });
  }
};

const updateSalary = async (req, res) => {
  try {
    const salaryId = req.params.id;
    const fieldsToUpdate = req.body;

    // Check if salaryId is provided
    if (!salaryId) {
      return res.status(400).send({
        success: false,
        message: "Salary ID is required",
      });
    }

    // If no fields are provided to update, return an error
    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({
        success: false,
        message: "No fields provided to update",
      });
    }

    // Build the dynamic query based on the fields provided
    const setClauses = [];
    const queryParams = [];
    Object.keys(fieldsToUpdate).forEach((field) => {
      setClauses.push(`${field} = ?`);
      queryParams.push(fieldsToUpdate[field]);
    });

    // Add salaryId to the end of queryParams
    queryParams.push(salaryId);

    // Construct the SQL query string
    const query = `UPDATE Salaries SET ${setClauses.join(
      ", "
    )} WHERE salary_id = ?`;

    // Execute the query
    const result = await db.query(query, queryParams);

    if (result[0].affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Salary not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Salary updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating salary",
      error,
    });
  }
};

const deleteSalary = async (req, res) => {
  try {
    const salaryId = req.params.id;

    // Check if salaryId is provided
    if (!salaryId) {
      return res.status(400).send({
        success: false,
        message: "Salary ID is required",
      });
    }

    // Delete the salary from the database
    const result = await db.query("DELETE FROM Salaries WHERE salary_id = ?", [
      salaryId,
    ]);

    if (result[0].affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Salary not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Salary deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting salary",
      error,
    });
  }
};

const getAllSalaries = async (req, res) => {
  try {
    const salaries = await db.query("SELECT * FROM Salaries");

    res.status(200).send({
      success: true,
      message: "All salaries retrieved successfully",
      salaries: salaries[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving salaries",
      error,
    });
  }
};

const getSalaryById = async (req, res) => {
  try {
    const salaryId = req.params.id;

    // Check if salaryId is provided
    if (!salaryId) {
      return res.status(400).send({
        success: false,
        message: "Salary ID is required",
      });
    }

    const salary = await db.query(
      "SELECT * FROM Salaries WHERE salary_id = ?",
      [salaryId]
    );

    if (!salary[0][0]) {
      return res.status(404).send({
        success: false,
        message: "Salary not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Salary retrieved successfully",
      salary: salary[0][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving salary",
      error,
    });
  }
};

const getSalariesByTrainerId = async (req, res) => {
  try {
    const trainerId = req.params.id;

    // Check if trainerId is provided
    if (!trainerId) {
      return res.status(400).send({
        success: false,
        message: "Trainer ID is required",
      });
    }

    const salaries = await db.query(
      "SELECT * FROM Salaries WHERE trainer_id = ?",
      [trainerId]
    );

    // Check if any salaries are found
    if (!salaries[0].length) {
      return res.status(404).send({
        success: false,
        message: "No salaries found for the provided trainer ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Salaries retrieved successfully",
      salaries: salaries[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving salaries",
      error,
    });
  }
};

module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getAllSalaries,
  getSalaryById,
  getSalariesByTrainerId,
};
