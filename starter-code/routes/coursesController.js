const express = require("express");
const coursesController = express.Router();
const User = require("../models/User");
const Courses = require('../models/Course');

coursesController.get("/courses/index", (req, res, next) => {
  Courses.find().exec((err, courses) => {
    res.render("courses/index", {
      courses: courses
    });
  });
});

module.exports = coursesController;