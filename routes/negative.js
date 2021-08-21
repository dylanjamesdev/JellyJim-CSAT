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

route.get("/:ticket/negative", (req, res, next) => {
  const ticket = req.params.ticket;
  let data = {
    ticket: ticket,
    positive: false,
    negative: true,
  }
  return res.render("feedback", data);
});

route.post("/:ticket/negative", (req, res, next) => {
  const ticket = req.params.ticket;
  const comment = req.body.comments;

  var mailOptions = {
    from: config.mailserver_username,
    to: config.emailto,
    subject: `Ticket ${ticket} - Customer Satisfaction Survey`,
    text: `The owner of ticket #${ticket} selected that they are unhappy with the resolution. \n \n Comments: \n ${comment}`
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
    comment: comment,
  }
  return res.render("submitted", data)
});

module.exports = route;
