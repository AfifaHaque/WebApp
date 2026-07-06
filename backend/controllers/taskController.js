const Task = require("../models/Task");

// Create new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      course_name,
      task_type,
      description,
      deadline,
      priority,
      status,
    } = req.body;

    if (!title || !course_name || !task_type || !deadline) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const task = await Task.create({
      user_id: req.user._id,
      title,
      course_name,
      task_type,
      description,
      deadline,
      priority,
      status,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all tasks of logged-in user with search and filters
const getTasks = async (req, res) => {
  try {
    const { search, course_name, task_type, priority, status, deadline } =
      req.query;

    const filter = {
      user_id: req.user._id,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { course_name: { $regex: search, $options: "i" } },
      ];
    }

    if (course_name) {
      filter.course_name = { $regex: course_name, $options: "i" };
    }

    if (task_type) {
      filter.task_type = task_type;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }

    if (deadline) {
      const startDate = new Date(deadline);
      const endDate = new Date(deadline);
      endDate.setDate(endDate.getDate() + 1);

      filter.deadline = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const tasks = await Task.find(filter).sort({ deadline: 1 });

    res.json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Mark task as completed
const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "Completed";
    await task.save();

    res.json({
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
};