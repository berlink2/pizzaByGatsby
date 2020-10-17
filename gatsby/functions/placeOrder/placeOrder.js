const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

exports.handler = async (event, context) => {
  const requiredFields = ["email", "name", "order"];
  const data = JSON.parse(event.body);
  if (data.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error 1234" }),
    };
  }
  let correctFormat = true;
  for (const field of requiredFields) {
    if (!data[field]) {
      correctFormat = false;
      break;
    }
  }

  if (!correctFormat) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Wrong input" }),
    };
  }

  const info = await transporter.sendMail({
    from: "Slicks Slices <slick@example.com>",
    to: "orders@example.com",
    subject: "New order",
    html: `<p>New order!</p>`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
