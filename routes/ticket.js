//  Consts
const { Router } = require("express");
const nodemailer = require('nodemailer');

// Inits
var route = Router();
const transporter = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "",
    pass: ""
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Home
route.get("/", (req, res, next) => {
  return res.redirect("https://jellyjim.com/404")
});


// Positive Review Collector
route.get("/:ticket/positive", (req, res, next) => {

  let data = {
    ticket: req.params.ticket,
    positive: true,
    negative: false
  }
  return res.render("index", data);
});

// Positive Review Handler
route.post("/:ticket/positive", (req, res, next) => {

  const ticket = req.params.ticket;
  const comment = req.body.comments;

  var mailOptions = {
    from: '',
    to: '',
    subject: 'Ticket CSAT Feedback',
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

// Negative Review Collector
route.get("/:ticket/negative", (req, res, next) => {

  const ticket = req.params.ticket;
  let data = {
    ticket: ticket,
    positive: false,
    negative: true
  }
  return res.render("index", data);
});

// Negative Review Handler
route.post("/:ticket/negative", (req, res, next) => {

  const ticket = req.params.ticket;
  const comment = req.body.comments;

  var mailOptions = {
    from: '',
    to: '',
    subject: '',
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


route.get("*", (req, res, next) => {
  return res.redirect("/")
});

module.exports = route;
