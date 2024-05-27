const db = require("../config/db");

const createPlan = async (req, res) => {
  try {
    const { plan_name, cost, description } = req.body;

    if (!plan_name || !cost) {
      return res.status(400).send({
        success: false,
        message: "Plan name and cost are required",
      });
    }

    const query =
      "INSERT INTO Plans (plan_name, cost, description) VALUES (?, ?, ?)";
    const values = [plan_name, cost, description];

    const result = await db.query(query, values);

    res.status(201).send({
      success: true,
      message: "Plan created successfully",
      planId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating plan",
      error,
    });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Plans");

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No plans found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All plans",
      plans: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching plans",
      error,
    });
  }
};

const getPlanById = async (req, res) => {
  try {
    const planId = req.params.id;

    if (!planId) {
      return res.status(400).send({
        success: false,
        message: "Plan ID is required",
      });
    }

    const data = await db.query("SELECT * FROM Plans WHERE plan_id = ?", [
      planId,
    ]);

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Plan details",
      plan: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching plan",
      error,
    });
  }
};


const updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const { plan_name, cost, description } = req.body;

    if (!planId) {
      return res.status(400).send({
        success: false,
        message: "Plan ID is required",
      });
    }

    if (!plan_name || !cost) {
      return res.status(400).send({
        success: false,
        message: "Plan name and cost are required",
      });
    }

    const query = "UPDATE Plans SET plan_name = ?, cost = ?, description = ? WHERE plan_id = ?";
    const values = [plan_name, cost, description, planId];

    const result = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Plan updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating plan",
      error,
    });
  }
};


const deletePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    if (!planId) {
      return res.status(400).send({
        success: false,
        message: "Plan ID is required",
      });
    }

    const result = await db.query("DELETE FROM Plans WHERE plan_id = ?", [planId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting plan",
      error,
    });
  }
};


module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan
};
