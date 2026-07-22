const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  getAllUsers,
  getAllTasks,
  getAdminSummary,
} = require("../controllers/adminController");

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/tasks", protect, adminOnly, getAllTasks);
router.get("/summary", protect, adminOnly, getAdminSummary);

module.exports = router;