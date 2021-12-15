
var config = require('./config');
//config is json file
const puppeteer = require('puppeteer');
const {user , pass} = config
var nodemailer = require('nodemailer');

const filename = "cert"
const fileExtention = 'png'
const file = `${filename}.${fileExtention}`
const pageName = `${__dirname}/kandi.htm`

function sent() {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
});

var mailOptions = {
  from: user,
  to: user,
  subject: 'Sending Email using Node.js',
  text: `cert ${clock()}`,
  attachments: [{
    filename: file,
    path: file
}]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(pageName);
  await page.setViewport({ width: 1000, height: 1000}); // This is ignored
  await page.screenshot({path: `${file}`});

  await browser.close();
  await sent()
})();


function clock() {
  const monthNames = ["01", "02", "03", "04", "05", "06",
	"07", "08", "09", "10", "11", "12"];
const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const output = day + '.' + month  + '.' + year;
return output
}