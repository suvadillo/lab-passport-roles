const mongoose = require("mongoose");
const express = require("express");
const profilesController = express.Router();
const User = require('../models/User');
const Courses = require ('../models/Course');
mongoose.connect("mongodb://localhost/ibi-ironhack");

profilesController.get("/index", (req, res, next) => {
  let userUs = req.user.username;
  User.find().exec((err, userProfiles) => {
    res.render("profiles/index", {
      userUs: userUs, userProfiles: userProfiles
    });
  });
});

profilesController.get("/edit", (req, res, next) => {
  User.findOne({username: req.user.username}).then((usr) => {
    res.render("profiles/editProfile", {usr: usr});
  })
});

profilesController.post("/edit", (req, res, next) => {
  const { username, name, familyName, password } = req.body 

  const update = {  
    username: username || req.user.username,
    name: name || req.user.name,
    familyName: familyName || req.user.familyName,
    password: password || req.user.password
  }

  let id = req.user._id
  console.log('este es mi user id guardado: ' + id);
  User.findByIdAndUpdate(id, update, {new: true}, (err, usr) => {
    if (err){ return next(err); }
    return res.redirect('/profiles/index');
  })
});


module.exports = profilesController;