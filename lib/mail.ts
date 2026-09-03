import nodemailer from "nodemailer";
import { connectDB, SystemSetting } from "./db";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notificationEmail: string;
}

export async function getSmtpConfig(): Promise<SmtpConfig> {
  try {
    await connectDB();
    const settings = await SystemSetting.find({});
    const map = new Map(settings.map((s) => [s.key, s.value]));

    return {
      host: map.get("smtp_host") || process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(map.get("smtp_port") || process.env.SMTP_PORT || "587", 10),
      secure: (map.get("smtp_secure") || process.env.SMTP_SECURE) === "true",
      user: map.get("smtp_user") || process.env.SMTP_USER || "",
      pass: map.get("smtp_pass") || process.env.SMTP_PASS || "",
      from: map.get("smtp_from") || process.env.SMTP_FROM || '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>',
      notificationEmail:
        map.get("notification_email") || process.env.NOTIFICATION_EMAIL || "bookings@oracleprivatehire.co.uk",
    };
  } catch {
    return {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
      from: process.env.SMTP_FROM || '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>',
      notificationEmail: process.env.NOTIFICATION_EMAIL || "bookings@oracleprivatehire.co.uk",
    };
  }
}

export async function createTransporter(config?: SmtpConfig) {
  const conf = config || (await getSmtpConfig());

  return nodemailer.createTransport({
    host: conf.host,
    port: conf.port,
    secure: conf.secure,
    auth: {
      user: conf.user,
      pass: conf.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendBookingEmails(booking: {
  bookingRef: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  serviceType: string;
  vehicleType: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string | null;
  returnTime?: string | null;
  isReturn?: boolean;
  flightNumber?: string | null;
  passengers: number;
  luggage: number;
  childSeats?: number;
  estimatedFare: number;
  paymentMethod: string;
  specialRequests?: string | null;
}) {
  const config = await getSmtpConfig();

  if (!config.user || !config.pass) {
    console.log(`[SMTP] Note: SMTP credentials not set. Email simulation for booking ${booking.bookingRef}`);
    return { success: true, simulated: true };
  }

  const transporter = await createTransporter(config);

  const customerHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0D0D0D; color: #ffffff; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #141414; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; overflow: hidden; }
      .header { background: linear-gradient(135deg, #1A1813, #0D0D0D); padding: 35px 30px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); }
      .gold-text { color: #D4AF37; }
      .badge { display: inline-block; background: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; color: #D4AF37; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: bold; letter-spacing: 1px; }
      .content { padding: 30px; }
      .info-card { background: #1C1C1C; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.06); }
      .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; }
      .label { color: #888888; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
      .value { color: #ffffff; font-weight: 600; text-align: right; }
      .fare-box { background: linear-gradient(135deg, #241E12, #141414); border: 1px solid #D4AF37; border-radius: 12px; padding: 20px; text-align: center; margin-top: 20px; }
      .fare-title { color: #D4AF37; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
      .fare-amount { font-size: 32px; font-weight: bold; color: #FFFFFF; margin: 8px 0; }
      .footer { background: #0D0D0D; padding: 25px; text-align: center; font-size: 12px; color: #777777; border-top: 1px solid rgba(255, 255, 255, 0.05); }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; font-size: 26px; color: #D4AF37; letter-spacing: 2px;">ORACLE PRIVATE HIRE</h1>
        <p style="margin: 8px 0 16px; color: #AAAAAA; font-size: 13px;">Luxury Chauffeur & Airport Transfers</p>
        <div class="badge">BOOKING REF: ${booking.bookingRef}</div>
      </div>
      <div class="content">
        <h2 style="font-size: 18px; margin-top: 0;">Dear ${booking.passengerName},</h2>
        <p style="color: #CCCCCC; line-height: 1.6; font-size: 14px;">
          Thank you for reserving with Oracle Private Hire. Your journey request has been recorded and is currently being processed by our dispatch team.
        </p>

        <div class="info-card">
          <div class="info-row"><span class="label">Service</span><span class="value">${booking.serviceType.toUpperCase()}</span></div>
          <div class="info-row"><span class="label">Vehicle</span><span class="value">${booking.vehicleType}</span></div>
          <div class="info-row"><span class="label">Pickup Address</span><span class="value">${booking.pickupAddress}</span></div>
          <div class="info-row"><span class="label">Destination</span><span class="value">${booking.dropoffAddress}</span></div>
          <div class="info-row"><span class="label">Date & Time</span><span class="value">${booking.pickupDate} at ${booking.pickupTime}</span></div>
          ${booking.flightNumber ? `<div class="info-row"><span class="label">Flight Number</span><span class="value">${booking.flightNumber}</span></div>` : ""}
          ${booking.isReturn ? `<div class="info-row"><span class="label">Return Date</span><span class="value">${booking.returnDate} at ${booking.returnTime}</span></div>` : ""}
          <div class="info-row"><span class="label">Passengers / Luggage</span><span class="value">${booking.passengers} Adults, ${booking.luggage} Bags</span></div>
          ${booking.childSeats ? `<div class="info-row"><span class="label">Child Seats</span><span class="value">${booking.childSeats}</span></div>` : ""}
        </div>

        <div class="fare-box">
          <div class="fare-title">Estimated Fixed Fare</div>
          <div class="fare-amount">£${booking.estimatedFare.toFixed(2)}</div>
          <p style="margin: 0; color: #AAAAAA; font-size: 12px;">Payment Method: ${booking.paymentMethod.replace(/_/g, " ").toUpperCase()}</p>
        </div>

        ${booking.specialRequests ? `
        <div class="info-card" style="margin-top: 20px;">
          <span class="label">Special Instructions:</span>
          <p style="margin: 6px 0 0; color: #CCCCCC; font-size: 13px;">${booking.specialRequests}</p>
        </div>` : ""}
      </div>
      <div class="footer">
        <p style="margin: 0 0 6px;">Questions? Contact us 24/7 at <strong>07456714214</strong> or reply to this email.</p>
        <p style="margin: 0;">&copy; Oracle Private Hire. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #181818; padding: 24px; border-radius: 12px; border-left: 4px solid #D4AF37;">
      <h2 style="color: #D4AF37; margin-top: 0;">⚡ NEW BOOKING RECEIVED — ${booking.bookingRef}</h2>
      <p><strong>Customer:</strong> ${booking.passengerName} (${booking.passengerEmail} / ${booking.passengerPhone})</p>
      <p><strong>Service:</strong> ${booking.serviceType} &middot; <strong>Vehicle:</strong> ${booking.vehicleType}</p>
      <p><strong>Pickup:</strong> ${booking.pickupAddress} (${booking.pickupDate} @ ${booking.pickupTime})</p>
      <p><strong>Dropoff:</strong> ${booking.dropoffAddress}</p>
      ${booking.flightNumber ? `<p><strong>Flight:</strong> ${booking.flightNumber}</p>` : ""}
      <p><strong>Estimated Fare:</strong> £${booking.estimatedFare.toFixed(2)}</p>
      <p><strong>Payment:</strong> ${booking.paymentMethod}</p>
      ${booking.specialRequests ? `<p><strong>Notes:</strong> ${booking.specialRequests}</p>` : ""}
      <hr style="border-color: #333;" />
      <p style="font-size: 12px; color: #888;">Log into the Admin Dashboard to accept or manage this ride.</p>
    </div>
  </body>
  </html>
  `;

  // Dispatch customer receipt
  await transporter.sendMail({
    from: config.from,
    to: booking.passengerEmail,
    subject: `Booking Confirmation [${booking.bookingRef}] — Oracle Private Hire`,
    html: customerHtml,
  });

  // Dispatch admin alert
  if (config.notificationEmail) {
    await transporter.sendMail({
      from: config.from,
      to: config.notificationEmail,
      subject: `[NEW BOOKING] ${booking.bookingRef} — ${booking.passengerName} (£${booking.estimatedFare})`,
      html: adminHtml,
    });
  }

  return { success: true };
}

export async function sendContactEmails(contact: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) {
  const config = await getSmtpConfig();

  if (!config.user || !config.pass) {
    console.log(`[SMTP] Note: SMTP credentials not set. Email simulation for contact from ${contact.email}`);
    return { success: true, simulated: true };
  }

  const transporter = await createTransporter(config);

  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; background: #0D0D0D; color: #fff; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #181818; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
      <h3 style="color: #D4AF37; margin-top: 0;">New Contact Inquiry: ${contact.subject || "General Inquiry"}</h3>
      <p><strong>From:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">
      <p style="white-space: pre-wrap; color: #ddd;">${contact.message}</p>
    </div>
  </body>
  </html>
  `;

  if (config.notificationEmail) {
    await transporter.sendMail({
      from: config.from,
      to: config.notificationEmail,
      replyTo: contact.email,
      subject: `[Contact Form] ${contact.subject || "New Message"} from ${contact.name}`,
      html: adminHtml,
    });
  }

  return { success: true };
}

export async function sendTestEmail(testRecipient: string, customConfig?: SmtpConfig) {
  const config = customConfig || (await getSmtpConfig());
  const transporter = await createTransporter(config);

  const info = await transporter.sendMail({
    from: config.from,
    to: testRecipient,
    subject: `SMTP Test Successful — Oracle Private Hire`,
    html: `
      <div style="background: #0D0D0D; color: #fff; padding: 30px; font-family: sans-serif; border-radius: 12px; border: 1px solid #D4AF37; max-width: 500px; margin: auto;">
        <h2 style="color: #D4AF37; margin-top: 0;">SMTP Connection Verified!</h2>
        <p>This is a live test email verifying that your Oracle Private Hire mail server is configured properly.</p>
        <p style="color: #888; font-size: 12px;">Sent at: ${new Date().toISOString()}</p>
      </div>
    `,
  });

  return info;
}
