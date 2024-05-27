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

module.exports = {
  getTrainers,
  getTrainerbyId,
};
