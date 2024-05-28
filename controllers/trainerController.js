const db = require("../config/db");

const getTrainers = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Trainers");
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All trainers records",
      trainers: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get trainers API",
      error,
    });
  }
};

const getTrainerbyId = async (req, res) => {
  try {
    const trainerId = req.params.id; //should be same as server file
    if (!trainerId) {
      return res.status(404).send({
        success: false,
        message: "Trainer ID invalid",
      });
    }
    const data = await db.query("SELECT * FROM Trainers WHERE trainer_id = ?", [
      trainerId,
    ]);
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      trainerDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET trainer by ID",
      error,
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;

    if (!trainerId) {
      return res.status(400).send({
        success: false,
        message: "Trainer ID is required",
      });
    }

    // Update member records associated with the trainer
    await db.query(
      "UPDATE Members SET trainer_id = NULL WHERE trainer_id = ?",
      [trainerId]
    );

    // Delete salary records associated with the trainer
    await db.query("DELETE FROM Salaries WHERE trainer_id = ?", [trainerId]);

    // Then delete the trainer
    const result = await db.query("DELETE FROM Trainers WHERE trainer_id = ?", [
      trainerId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting trainer",
      error,
    });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const fieldsToUpdate = req.body;

    // Check if trainerId is provided
    if (!trainerId) {
      return res.status(400).send({
        success: false,
        message: "Trainer ID is required",
      });
    }

    // Build the dynamic update query based on the fields provided
    let query = "UPDATE Trainers SET";
    let queryParams = [];
    Object.keys(fieldsToUpdate).forEach((field, index) => {
      query += ` ${field} = ?`;
      if (index < Object.keys(fieldsToUpdate).length - 1) {
        query += ",";
      }
      queryParams.push(fieldsToUpdate[field]);
    });
    query += " WHERE trainer_id = ?";
    queryParams.push(trainerId);

    // Update the trainer in the database
    const result = await db.query(query, queryParams);

    if (result[0].affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Trainer not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Trainer updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating trainer",
      error,
    });
  }
};

const createTrainer = async (req, res) => {
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
      experience,
      salary,
    } = req.body;

    // Check if required fields are provided
    if (!full_name || !email_id) {
      return res.status(400).send({
        success: false,
        message: "Full name and email are required",
      });
    }

    const query = `
      INSERT INTO Trainers 
      (full_name, age, sex, IC_Passport, active_status, phone, email_id, address, sign_up_date, experience, salary) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      full_name,
      age,
      sex,
      IC_Passport,
      true, // active_status will be true by default
      phone,
      email_id,
      address,
      sign_up_date,
      experience,
      salary,
    ];

    const result = await db.query(query, values);

    res.status(201).send({
      success: true,
      message: "Trainer created successfully",
      trainerId: result[0].insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating trainer",
      error,
    });
  }
};

module.exports = {
  createTrainer,
  getTrainers,
  getTrainerbyId,
  deleteTrainer,
  updateTrainer,
};
