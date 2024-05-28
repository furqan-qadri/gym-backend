const db = require("../config/db");

const createPayment = async (req, res) => {
  try {
    const { memberId, paymentMonth, paymentDate, amount } = req.body;

    if (!memberId || !paymentMonth || !paymentDate || !amount) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields",
      });
    }

    // Insert the new payment into the Payments table
    await db.query(
      "INSERT INTO Payments (member_id, payment_month, payment_date, amount) VALUES (?, ?, ?, ?)",
      [memberId, paymentMonth, paymentDate, amount]
    );

    res.status(200).send({
      success: true,
      message: "Payment created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating payment",
      error,
    });
  }
};


const getAllPayments = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Payments");
    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "No payments found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All payments records",
      payments: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all payments",
      error,
    });
  }
};


const getPaymentsByMemberId = async (req, res) => {
  try {
    const memberId = req.params.id;
    if (!memberId) {
      return res.status(400).send({
        success: false,
        message: "Member ID is required",
      });
    }

    const data = await db.query("SELECT * FROM Payments WHERE member_id = ?", [memberId]);
    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "No payments found for the specified member",
      });
    }

    res.status(200).send({
      success: true,
      message: `Payments records for member ID ${memberId}`,
      payments: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting payments for the specified member",
      error,
    });
  }
};




const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Check if paymentId is provided
    if (!paymentId) {
      return res.status(400).send({
        success: false,
        message: "Payment ID is required",
      });
    }

    // Get the fields to update from the request body
    const fieldsToUpdate = req.body;

    // If no fields are provided, return an error
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
    
    // Construct the SQL query string
    const query = `UPDATE Payments SET ${setClauses.join(', ')} WHERE payment_id = ?`;
    queryParams.push(paymentId);

    // Execute the query
    const result = await db.query(query, queryParams);

    if (result[0].affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Payment not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Payment updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating payment",
      error,
    });
  }
};



const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    if (!paymentId) {
      return res.status(400).send({
        success: false,
        message: "Payment ID is required",
      });
    }

    // Delete the payment from the Payments table
    const result = await db.query("DELETE FROM Payments WHERE payment_id = ?", [
      paymentId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting payment",
      error,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentsByMemberId,
  getAllPayments,
  deletePayment,
  updatePayment,
};
