const express = require('express');
const router = express.Router();
const Course = require('../model/course.model.js');
const { ObjectId } = require('mongoose').Types;

// Get all courses with optional filtering
router.get('/', async (req, res) => {
  const { search, name, startDate, endDate, status } = req.query;
  
  const query = {};
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }
  
  if (startDate && endDate) {
    query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  } else if (startDate) {
    query.startDate = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.startDate = { $lte: new Date(endDate) };
  }
  
  if (status) {
    query.status = status;
  }
  
  try {
    const courses = await Course.find(query);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a course by ID
router.get('/:id', getCourse, (req, res) => {
  res.json(res.course);
});

// Create a new course
router.post('/', async (req, res) => {
  const course = new Course({
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a course by ID
router.patch('/:id', getCourse, async (req, res) => {
  // Update course properties
  if (req.body.name != null) {
    res.course.name = req.body.name;
  }
  if (req.body.description != null) {
    res.course.description = req.body.description;
  }
  if (req.body.startDate != null) {
    res.course.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.course.endDate = req.body.endDate;
  }

  try {
    const updatedCourse = await res.course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a course by ID
router.delete('/:id', getCourse, async (req, res) => {
  try {
    await res.course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCourse(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.course = course;
  next();
}

module.exports = router;
