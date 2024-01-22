import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
const smtpTransport = require('nodemailer-smtp-transport');


export async function POST(request: NextRequest) {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_TEST_USERNAME,
      pass: process.env.GMAIL_TEST_PASSWORD,
    },
  }));

  const mailOptions = {
    from: process.env.GMAIL_TEST_USERNAME,
    to: process.env.GMAIL_TEST_RECIPIENT,
    subject: 'Subject of the email',
    text: 'Body of the email',
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Email sent:', info.messageId);
  return NextResponse.json({something: "something"})
}
