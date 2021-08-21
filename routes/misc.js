const { Router } = require("express");
const nodemailer = require('nodemailer');
const config = require('../config')

var route = Router();

route.get("/:ticket/*", (req, res, next) => {
  return res.redirect(`${config.url}/${req.params.ticket}`)
})

route.get("*", (req, res, next) => {
  return res.redirect("https://jellyjim.com/")
});

module.exports = route;
