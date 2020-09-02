const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({
  origin: true
});

exports.sendMail = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const data = request.body;
      let transporter = nodemailer.createTransport({
        service: "Zoho",
        host: "smtp.zoho.com",
        port: 587,
        secure: false,
        auth: {
          user: "eventadmin@mext.in",
          pass: "_aDmin123"
        }
      });

      console.log(data.emails);
      let info1 = await transporter.sendMail({
        from: '"Vedant Yogesh 👻" <vedantyogesh@gmail.com>',
        to: data.venue.email,
        subject: data.venue.title + " - Venue Confirmation",
        html: data.venuehtml
      });
      let info2 = await transporter.sendMail({
        from: '"Vedant Yogesh 👻" <vedantyogesh@gmail.com>',
        to: data.emails,
        subject: data.venue.title + " - Event Notification",
        html: data.providerhtml
      });
      response.json({ info1, info2 }).status(200);
    } catch (err) {
      console.log(err);
      response.json({ err }).status(401);
    }
  });
});
