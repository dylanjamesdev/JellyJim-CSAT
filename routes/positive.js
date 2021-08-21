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

route.get("/:ticket/positive", (req, res, next) => {
  let data = {
    ticket: req.params.ticket,
    positive: true,
    negative: false
  }
  return res.render("feedback", data);
});

route.post("/:ticket/positive", (req, res, next) => {
  const ticket = req.params.ticket;
  const comment = req.body.comments;

  var mailOptions = {
    from: config.mailserver_username,
    to: config.emailto,
    subject: `Ticket ${ticket} - Customer Satisfaction Survey`,
    text: `The owner of ticket #${ticket} selected that they are happy with the resolution. \n \n Comments: \n ${comment}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  let data = {
    ticket: ticket,
    comment: comment
  }
  res.render("submitted", data);
});

module.exports = route;
