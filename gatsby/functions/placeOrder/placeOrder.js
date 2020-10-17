const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

module.exports = async (req, res) => {
  const requiredFields = ["email", "name", "order"];
  const { data } = req;
  if (data.mapleSyrup) {
    return res.status(400).json({
      message: "Error 1234",
    });
    // return {
    //   statusCode: 400,
    //   body: JSON.stringify({ message: "Error 1234" }),
    // };
  }
  let correctFormat = true;
  for (const field of requiredFields) {
    if (!data[field]) {
      correctFormat = false;
      break;
    }
  }

  if (!correctFormat) {
    // return {
    //   statusCode: 400,
    //   body: JSON.stringify({ message: "Wrong input" }),
    // };
    return res.status(400).json({
      message: "Wrong input",
    });
  }

  const info = await transporter.sendMail({
    from: "Slicks Slices <slick@example.com>",
    to: "orders@example.com",
    subject: "New order",
    html: `<p>New order!</p>`,
  });

  return res.status(200).json({
    message: "Success",
  });

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ message: "Success" }),
  // };
};
