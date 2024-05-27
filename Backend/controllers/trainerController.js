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
    await db.query("UPDATE Members SET trainer_id = NULL WHERE trainer_id = ?", [trainerId]);

    // Delete salary records associated with the trainer
    await db.query("DELETE FROM Salaries WHERE trainer_id = ?", [trainerId]);

    // Then delete the trainer
    const result = await db.query("DELETE FROM Trainers WHERE trainer_id = ?", [trainerId]);

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



module.exports = {
  getTrainers,
  getTrainerbyId,
  deleteTrainer,
};
