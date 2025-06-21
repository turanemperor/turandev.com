const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/az", (req, res) => res.sendFile(path.join(__dirname, "az.html")));
app.get("/ru", (req, res) => res.sendFile(path.join(__dirname, "ru.html")));

app.post(
  "/send",
  [
    body("name").notEmpty().withMessage("Enter Name"),
    body("email").isEmail().withMessage("Invalid email"),
    body("message").notEmpty().withMessage("Type Message"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("Error: " + JSON.stringify(errors.array()));
    }

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO,
      subject: "Apply",
      html: `
        <h3>Yeni Mesaj</h3>
        <p><b>Ad:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mesaj:</b><br>${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.send("Message was sent successfully!");
    } catch (err) {
      console.error("Mail sending error:", err);
      res.status(500).send("Mail was not sent.");
    }
  }
);

// Server başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
