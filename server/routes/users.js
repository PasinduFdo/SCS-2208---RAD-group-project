const express = require('express');
const path = require('path');
const passport = require("passport");
const router = express.Router();

router.post('/login', (req,res) => {
  passport.authenticate("local",  {successRedirect:'/dashboard', failureRedirect:'login?error=true'}, (err, result, info) => {

    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!result) {
      res.status(409).json({ errors: "Incorrect Email or Password" });
      return;
    }

    req.logIn(result, (err) => {

      if (err) {
        console.log(err);
        return res.status(400).json({ errors: err });
      }

      return res.status(200).json({ success: true, message: "User logged in successfully", user: req.user });

    });
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout(req.user, (err,next) => {
    if(err) {
      return next(err);
    }
    res.status(200).json({
      message: "Logged out successfully"
    });
  });
});

module.exports = router;
