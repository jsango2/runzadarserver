const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());
app.use(bodyParser.json());

const contactAddress = 'info@zadarnight.run';
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: 'mail.runzadar.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.USER, // generated ethereal user
		pass: process.env.PASS, // generated ethereal password
	},
});

// send mail with defined transport object
app.post('/send', (req, res) => {
	try {
		const mailOptions = {
			from: req.body.email,
			to: process.env.email,
			subject: req.body.subject,
			html: `
			  <p>You have a new message from ${req.body.ime}.</p>
			  <h4>Contact Details:</h4>
			  <ul>
				  <li>Name: ${req.body.ime}</li>
				  <li>Email: ${req.body.email}</li>
				  <li>Message: ${req.body.poruka}</li>
			  </ul>
			  `,
		};

		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				res.status(500).send({
					success: false,
					message: 'Something went wrong. Try again later.',
				});
				console.error(err);
			} else {
				res.send({
					success: true,
					message: 'Thanks for contacting us! We will get back to you ASAP!',
				});
			}
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: 'Something went wrong. Try again later.',
		});
	}
});

app.listen(PORT, () => console.log(`Started server at http://localhost:5000!`));
