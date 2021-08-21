
const { Router } = require("express");
const nodemailer = require('nodemailer');
const config = require('../config')

var route = Router();

const transporter = nodemailer.createTransport({
  host: config.mailserver_host,
  port: config.mailserver_port,
  secure: true,
  auth: {
    user: config.mailserver_username,
    pass: config.mailserver_password
  },
  tls: {
    rejectUnauthorized: false
  }
});

route.get("/:ticket", (req, res, next) => {
  let data = {
    ticket: req.params.ticket,
    url: config.url
  }
  return res.render("selector", data)
})

module.exports = route;
