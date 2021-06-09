const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

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
		user: 'info@zadarnight.run', // generated ethereal user
		pass: 'Burek123456!', // generated ethereal password
	},
});

// send mail with defined transport object
app.post('/contact', function (req, res) {
	//   res.sendStatus(200)
	console.log(req.body);
	transporter.sendMail(
		{
			from: req.body.email,
			to: [contactAddress],
			subject: req.body.Ime + ' ' + 'Kontakt Forma ZaboravljenaDalmacija.hr',
			html: req.body.poruka || '[No message]',
		},
		function (err, info) {
			if (err) return res.status(500).send(err);
			res.json({ success: true });
		}
	);
});

app.listen(5000, () => console.log(`Started server at http://localhost:5000!`));
