import nodemailer from "nodemailer";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userEmail = session?.user.email.toLowerCase();
    const userName = session?.user.name;
    console.log("User email:", userEmail);
    const { senderName, senderEmail, recipientEmail, serviceTitle, ratingKey } =
      await req.json();
    // Create a transporter using your email service
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTH_NODEMAILER_EMAIL,
        pass: process.env.AUTH_NODEMAILER_PASSWORD,
      },
    });

    // Construct email for service provider
    const emailToProvider = {
      from: senderEmail,
      to: recipientEmail,
      subject: `no-reply: Service Inquiry - ${serviceTitle}`,
      text: `CONGRATULATIONS!

You have a new inquiry about your service "${serviceTitle}" from ${userName}. Please respond directly to the inquiry at ${userEmail} to correspond with the client.

Thank you for your time, and best of luck with your service!.

Regards,
${senderName}

--- Rate My Service Link ---

When you are ready to provide the user/client with the rating link, please copy and paste the following link inside an email to the user/client:

${process.env.NEXT_PUBLIC_APP_URL}/rate/${ratingKey}

This link carries with it a unique key that will allow ONLY the user/client to rate your service.

--- Please note the following: ---

1. The user/client will have 90 days from the date of this email to rate your service.
2. Only send this link when you are ready for the user/client to rate your service.
3. The unique key needed to access this link is a one-time use key so once the user/client has rated your service, the link will no longer be valid.

The rating request will expire in 90 days.`,
    };

    // Send email
    await transporter.sendMail(emailToProvider);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 400 }
    );
  }
}
