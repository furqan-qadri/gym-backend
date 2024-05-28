const express = require("express");
const {
  createPayment,
  deletePayment,
  getAllPayments,
  updatePayment,
  getPaymentsByMemberId,
} = require("../controllers/paymentController");

//creating router object
const router = express.Router();

//get all students list get
router.get("/getall", getAllPayments);
router.post("/create", createPayment);
router.get("/member/:id", getPaymentsByMemberId);

//update by id
router.put("/update/:id", updatePayment);
router.delete("/delete/:id", deletePayment);
// router.get("/getplandetails", getPlanDetails);

module.exports = router;
