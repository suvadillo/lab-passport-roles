const express = require("express");
const coursesController = express.Router();
const Courses = require('../models/Course');

coursesController.get("/courses/index", (req, res, next) => {
  Courses.find().exec((err, courses) => {
    res.render("courses/index", {
      courses: courses
    });
  });
});

module.exports = coursesController;