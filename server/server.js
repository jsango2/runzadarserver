const path = require('path');
// const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// app.use(
// 	bodyParser.urlencoded({
// 		extended: true,
// 	})
// );
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());
app.use(express.json());

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
app.get('/get', (req, res) => {
	res.send('hello world');
});
// send mail with defined transport object
app.post('/send', (req, res) => {
	try {
		const mailOptions = {
			from: req.body.email,
			to: contactAddress,
			subject: 'Zaboravljena Dalmacija Kontakt forma',
			html: `
			  <p>Imate novu poruku od ${req.body.Ime}.</p>
			  <h4>Contact Details:</h4>
			  <ul>
				  <li>Ime pošiljatelja: ${req.body.Ime}</li>
				  <li>Email: ${req.body.mail}</li>
				  <li>Poruka: ${req.body.poruka}</li>
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

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
