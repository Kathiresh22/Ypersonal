const nodemailer = require("nodemailer");
const config = require("../config");
const env = config.ENV;

exports.newTicketEmail = async (data) => {
  var transporter = nodemailer.createTransport({
    host: config[env].SES.HOST,
    port: config[env].SES.PORT,
    auth: {
      user: config[env].SES.UNAME,
      pass: config[env].SES.PASS,
    },
  });

  var mailOptions = {
    from: config[env].EMAILS.SUPPORT_DL,
    to: config[env].EMAILS.ADMIN_GMAILS,
    subject: `New Ticket from User(${env}) [IMP]`,
    html: `<h2>Ticket Details:-</h2>
            <p style="color=red;">***If you are an admin and seeing this email, Please act ASAP***</p>
            <ul>
            <li>Ticket ID : ${data._id}</li>
            <li>createdBy: ${data.name} (${data.userId})</li>
            <li>Email-Id: ${data.email}</li>
            <li>Subject: ${data.subject}</li>
            <li>Message: ${data.message}</li>
            </ul>
            <br/>
            <strong>Thanks</strong>
            <br/>
            <strong style="color:red;"><small>Content of this mail is copyright property of codersbid.com. Any misuse of information is liable to lawful acyion.<small></strong>`,
  };
  //console.log("Here...");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      //return false;
    } else {
      console.log("Email sent: " + info.response);
      console.log(info);
      //return true;
    }
  });
};

exports.ticketReplyEmail = async (data) => {
  var transporter = nodemailer.createTransport({
    host: config[env].SES.HOST,
    port: config[env].SES.PORT,
    auth: {
      user: config[env].SES.UNAME,
      pass: config[env].SES.PASS,
    },
  });

  var mailOptions = {
    from: "support@codersbid.com",
    to: data.mailTo,
    subject: `Resolution of "${data.subject}" Inquiry`,
    html: `<h2>HI ${data.name},</h2>
            <br/><h4>
            ${data.content}
            </h4>
            <br/>
            <strong>Thanks,</strong><br/>
            <strong>Team CodersBid</strong>
            <br/>
            <strong style="color:red;"><small>Content of this mail is copyright property of codersbid.com. Any misuse of information is liable to lawful acyion.<small></strong>`,
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    return true;
  } catch (ex) {
    console.log(ex.response);
    return false;
  }
};
