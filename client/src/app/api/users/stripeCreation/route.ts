import { StripeEndpoint } from "@/lib/types/stripe";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
const smtpTransport = require('nodemailer-smtp-transport');
import Stripe from "stripe";

function generateRandomNumberString() {
  // Generate a random decimal between 0 and 1
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 1000000);
  const randomNumberString = randomNumber.toString().padStart(6, '0');

  return randomNumberString;
}

export async function POST(req: NextRequest) {

  let event:StripeEndpoint

  try {
    const sig = req.headers.get('stripe-signature') ?? "";
    event = Stripe.webhooks.constructEvent(await req.text(), sig, process.env.STRIPE_ENDPOINT_SECRET ?? "") as StripeEndpoint
    const metadata: any = event.data.object.metadata

    if (Object.keys(metadata).length == 0) return NextResponse.json({data: "Irrelevant", status: 200})
    if (metadata.donorbox_campaign != "Join us as a member") return NextResponse.json({data: "Irrelevant", status: 200})

    const {donorbox_email, donorbox_first_name, donorbox_last_name} = metadata;
    const randomCode = generateRandomNumberString()

    const transporter = nodemailer.createTransport(smtpTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_TEST_USERNAME,
        pass: process.env.GMAIL_TEST_PASSWORD,
      },
    }));
  
    const mailOptions = {
      from: process.env.GMAIL_TEST_USERNAME,
      to: donorbox_email,
      subject: 'This is a very important test ',
      text: `Code: ${randomCode}`,
    };

    const info = await transporter.sendMail(mailOptions);

    await User.addSignUpTwoFactor(donorbox_email, randomCode, donorbox_first_name, donorbox_last_name)

    console.log('Email sent:', info.messageId);

  } catch(err) {
    console.error(err);
    return NextResponse.json({error: JSON.stringify(err), status: 400})
  }

  return NextResponse.json({something: "something"})
}