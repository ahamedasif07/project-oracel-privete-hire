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
  oauthClientId?: string;
  oauthClientSecret?: string;
  oauthRefreshToken?: string;
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
      user: map.get("smtp_user") || process.env.SMTP_USER || process.env.GMAIL_USER || "",
      pass: map.get("smtp_pass") || process.env.SMTP_PASS || "",
      from:
        map.get("smtp_from") ||
        process.env.SMTP_FROM ||
        '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>',
      notificationEmail:
        map.get("notification_email") ||
        process.env.NOTIFICATION_EMAIL ||
        "bookings@oracleprivatehire.co.uk",
      oauthClientId: map.get("gmail_client_id") || process.env.GMAIL_CLIENT_ID || "",
      oauthClientSecret: map.get("gmail_client_secret") || process.env.GMAIL_CLIENT_SECRET || "",
      oauthRefreshToken: map.get("gmail_refresh_token") || process.env.GMAIL_REFRESH_TOKEN || "",
    };
  } catch {
    return {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER || process.env.GMAIL_USER || "",
      pass: process.env.SMTP_PASS || "",
      from: process.env.SMTP_FROM || '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>',
      notificationEmail: process.env.NOTIFICATION_EMAIL || "bookings@oracleprivatehire.co.uk",
      oauthClientId: process.env.GMAIL_CLIENT_ID || "",
      oauthClientSecret: process.env.GMAIL_CLIENT_SECRET || "",
      oauthRefreshToken: process.env.GMAIL_REFRESH_TOKEN || "",
    };
  }
}

export async function createTransporter(config?: SmtpConfig) {
  const conf = config || (await getSmtpConfig());

  // 1. Google Cloud Console OAuth2
  if (conf.oauthClientId && conf.oauthClientSecret && conf.oauthRefreshToken) {
    const oauthUser = process.env.GMAIL_USER || conf.user || "rxasif31@gmail.com";
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: oauthUser,
        clientId: conf.oauthClientId,
        clientSecret: conf.oauthClientSecret,
        refreshToken: conf.oauthRefreshToken,
      },
    });
  }

  // 2. Standard SMTP / App Password
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
  airportDropoffFee?: number;
  estimatedFare: number;
  paymentMethod: string;
  specialRequests?: string | null;
}) {
  const config = await getSmtpConfig();

  const isOAuth = !!(config.oauthClientId && config.oauthRefreshToken);
  const isSmtp = !!(config.user && config.pass);

  if (!isOAuth && !isSmtp) {
    console.log(`[SMTP] Note: Mail credentials not set. Simulated email for booking ${booking.bookingRef}`);
    return { success: true, simulated: true };
  }

  const transporter = await createTransporter(config);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // =========================================================================
  // 1. ULTRA-PREMIUM CUSTOMER JOURNEY VOUCHER & INVOICE
  // =========================================================================
  const isCardPaid = booking.paymentMethod === "card_pay";

  const customerHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oracle Private Hire Voucher</title>
    <style>
      body { margin: 0; padding: 0; background-color: #08080A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #FFFFFF; }
      .wrapper { width: 100%; background-color: #08080A; padding: 30px 10px; }
      .container { max-width: 620px; margin: 0 auto; background-color: #121216; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.9); }
      .header { background: linear-gradient(180deg, #1C1910 0%, #121216 100%); padding: 40px 30px 30px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.25); }
      .brand-title { color: #D4AF37; font-size: 24px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin: 0; }
      .brand-subtitle { color: #8E8E98; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }
      .ref-badge { display: inline-block; background: rgba(212, 175, 55, 0.12); border: 1px solid #D4AF37; color: #F5E096; padding: 6px 18px; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; margin-top: 20px; }
      .content { padding: 32px 28px; }
      .greeting { font-size: 18px; font-weight: 700; color: #FFFFFF; margin: 0 0 10px; }
      .lead-text { color: #A8A8B3; font-size: 14px; line-height: 1.6; margin: 0 0 24px; }
      .card { background-color: #18181E; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 16px; padding: 20px; margin-bottom: 20px; }
      .card-header { font-size: 11px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 8px; }
      .row { display: flex; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-size: 13px; }
      .row:last-child { border-bottom: none; }
      .row-label { color: #888894; font-weight: 500; }
      .row-val { color: #FFFFFF; font-weight: 600; text-align: right; max-width: 65%; }
      .fare-card { background: linear-gradient(135deg, #241F14 0%, #17171C 100%); border: 1px solid #D4AF37; border-radius: 18px; padding: 24px; text-align: center; margin: 24px 0; }
      .fare-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #D4AF37; font-weight: 700; }
      .fare-value { font-size: 38px; font-weight: 800; color: #FFFFFF; margin: 6px 0; letter-spacing: -0.5px; }
      .status-pill { display: inline-block; padding: 4px 14px; border-radius: 30px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; margin-top: 4px; }
      .status-paid { background-color: rgba(16, 185, 129, 0.2); border: 1px solid #10B981; color: #34D399; }
      .status-cash { background-color: rgba(245, 158, 11, 0.2); border: 1px solid #F59E0B; color: #FBBF24; }
      .instruction-box { background: rgba(212, 175, 55, 0.05); border-left: 3px solid #D4AF37; padding: 14px 18px; border-radius: 0 12px 12px 0; margin-bottom: 24px; font-size: 12px; color: #CCCCCC; line-height: 1.5; }
      .footer { background-color: #0B0B0E; padding: 26px 20px; text-align: center; font-size: 11px; color: #6E6E7A; border-top: 1px solid rgba(255, 255, 255, 0.05); }
      .footer strong { color: #D4AF37; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <!-- Brand Header -->
        <div class="header">
          <h1 class="brand-title">ORACLE PRIVATE HIRE</h1>
          <p class="brand-subtitle">VIP Chauffeur &amp; Executive Travel</p>
          <div class="ref-badge">VOUCHER REF: ${booking.bookingRef}</div>
        </div>

        <div class="content">
          <p class="greeting">Dear ${booking.passengerName},</p>
          <p class="lead-text">
            Thank you for choosing Oracle Private Hire. Your luxury chauffeur reservation is confirmed.
            Please retain this voucher for your travel records.
          </p>

          <!-- Itinerary Card -->
          <div class="card">
            <div class="card-header">📍 Journey Itinerary</div>
            <div class="row">
              <span class="row-label">Service Type</span>
              <span class="row-val" style="color: #D4AF37;">${booking.serviceType.toUpperCase()}</span>
            </div>
            <div class="row">
              <span class="row-label">Pick-up Location</span>
              <span class="row-val">${booking.pickupAddress}</span>
            </div>
            <div class="row">
              <span class="row-label">Destination</span>
              <span class="row-val">${booking.dropoffAddress}</span>
            </div>
            <div class="row">
              <span class="row-label">Date &amp; Time</span>
              <span class="row-val" style="color: #FFFFFF;">${booking.pickupDate} at ${booking.pickupTime}</span>
            </div>
            ${booking.flightNumber ? `
            <div class="row">
              <span class="row-label">Flight Radar Monitoring</span>
              <span class="row-val" style="color: #60A5FA;">Flight ${booking.flightNumber}</span>
            </div>` : ""}
            ${booking.isReturn ? `
            <div class="row">
              <span class="row-label">Return Transfer</span>
              <span class="row-val">${booking.returnDate} at ${booking.returnTime}</span>
            </div>` : ""}
            <div class="row">
              <span class="row-label">Passengers &amp; Luggage</span>
              <span class="row-val">${booking.passengers} Passengers &middot; ${booking.luggage} Bags</span>
            </div>
          </div>

          <!-- Vehicle Specs Card -->
          <div class="card">
            <div class="card-header">🚘 Allocated Vehicle</div>
            <div class="row">
              <span class="row-label">Fleet Category</span>
              <span class="row-val" style="font-size: 14px; color: #FFFFFF;">${booking.vehicleType}</span>
            </div>
            <div class="row">
              <span class="row-label">Chauffeur Standard</span>
              <span class="row-val">Suited &middot; Licensed TfL Driver</span>
            </div>
            <div class="row">
              <span class="row-label">Included Amenities</span>
              <span class="row-val" style="color: #AAAAAA; font-size: 12px;">Mineral Water &middot; 5G Wi-Fi &middot; Dual Climate</span>
            </div>
          </div>

          <!-- Total Fare & Payment Status -->
          <div class="fare-card">
            <span class="fare-label">Total Guaranteed Fare</span>
            <div class="fare-value">£${booking.estimatedFare.toFixed(2)}</div>
            <div>
              <span class="status-pill ${isCardPaid ? "status-paid" : "status-cash"}">
                ${isCardPaid ? "PAID VIA STRIPE CARD ✓" : "HAND CASH (PAY ON ARRIVAL)"}
              </span>
            </div>
          </div>

          <!-- Chauffeur Meet & Greet Notice -->
          <div class="instruction-box">
            <strong>Chauffeur Assignment Notice:</strong> Your dedicated driver's name, mobile number, and vehicle registration number will be dispatched to your phone via SMS 30 minutes prior to pickup. For airport pickups, your driver will greet you in the arrivals hall with a nameboard.
          </div>

          ${booking.specialRequests ? `
          <div class="card">
            <div class="card-header">📝 Special Passenger Instructions</div>
            <p style="margin: 0; font-size: 13px; color: #DDDDDD;">${booking.specialRequests}</p>
          </div>` : ""}
        </div>

        <!-- Footer -->
        <div class="footer">
          <p style="margin: 0 0 6px;">24/7 Dispatch Concierge: <strong>07456714214</strong> &middot; info@oracleprivatehire.co.uk</p>
          <p style="margin: 0;">&copy; Oracle Private Hire United Kingdom. All rights reserved.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // =========================================================================
  // 2. MODERN HIGH-PRIORITY ADMIN DISPATCH ALERT VOUCHER
  // =========================================================================
  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Dispatch Alert</title>
    <style>
      body { margin: 0; padding: 0; background-color: #060608; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; }
      .wrapper { width: 100%; background-color: #060608; padding: 30px 10px; }
      .container { max-width: 620px; margin: 0 auto; background-color: #101014; border: 1px solid #D4AF37; border-radius: 20px; overflow: hidden; }
      .header { background: linear-gradient(135deg, #2B2108 0%, #101014 100%); padding: 28px 24px; border-bottom: 2px solid #D4AF37; }
      .badge-urgent { display: inline-block; background-color: #D4AF37; color: #000000; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; }
      .title { font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 12px 0 4px; }
      .subtitle { font-size: 12px; color: #9A9AA6; margin: 0; }
      .content { padding: 26px 24px; }
      .action-btn { display: block; background: #D4AF37; color: #000000; text-align: center; text-decoration: none; font-weight: 800; font-size: 13px; padding: 14px 20px; border-radius: 12px; margin: 0 0 24px; text-transform: uppercase; letter-spacing: 1px; }
      .section-box { background-color: #17171E; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 18px; margin-bottom: 16px; }
      .section-title { font-size: 11px; text-transform: uppercase; color: #D4AF37; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; }
      .item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.03); }
      .item:last-child { border-bottom: none; }
      .item-label { color: #888894; font-weight: 500; }
      .item-val { color: #FFFFFF; font-weight: 600; text-align: right; }
      .item-val a { color: #D4AF37; text-decoration: none; }
      .footer { background-color: #0A0A0D; padding: 18px 24px; font-size: 11px; color: #6E6E78; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <!-- Alert Header -->
        <div class="header">
          <span class="badge-urgent">⚡ NEW BOOKING RECEIVED</span>
          <h2 class="title">Booking ${booking.bookingRef}</h2>
          <p class="subtitle">Dispatched at ${new Date().toLocaleString("en-GB")}</p>
        </div>

        <div class="content">
          <!-- Quick Admin Action Button -->
          <a href="${appUrl}/admin/bookings" class="action-btn">
            Open Admin Dashboard to Assign Driver &rarr;
          </a>

          <!-- Passenger Contact Box -->
          <div class="section-box">
            <div class="section-title">👤 Passenger Information</div>
            <div class="item">
              <span class="item-label">Name</span>
              <span class="item-val" style="color: #FFFFFF; font-size: 14px;">${booking.passengerName}</span>
            </div>
            <div class="item">
              <span class="item-label">Phone</span>
              <span class="item-val"><a href="tel:${booking.passengerPhone}">${booking.passengerPhone} 📞</a></span>
            </div>
            <div class="item">
              <span class="item-label">Email</span>
              <span class="item-val"><a href="mailto:${booking.passengerEmail}">${booking.passengerEmail} ✉️</a></span>
            </div>
          </div>

          <!-- Journey Specs -->
          <div class="section-box">
            <div class="section-title">🗺️ Journey Details</div>
            <div class="item">
              <span class="item-label">Service</span>
              <span class="item-val" style="color: #D4AF37;">${booking.serviceType.toUpperCase()}</span>
            </div>
            <div class="item">
              <span class="item-label">Vehicle</span>
              <span class="item-val" style="color: #FFFFFF;">${booking.vehicleType}</span>
            </div>
            <div class="item">
              <span class="item-label">Pick-up Location</span>
              <span class="item-val">${booking.pickupAddress}</span>
            </div>
            <div class="item">
              <span class="item-label">Destination</span>
              <span class="item-val">${booking.dropoffAddress}</span>
            </div>
            <div class="item">
              <span class="item-label">Date &amp; Time</span>
              <span class="item-val" style="color: #34D399;">${booking.pickupDate} at ${booking.pickupTime}</span>
            </div>
            ${booking.flightNumber ? `
            <div class="item">
              <span class="item-label">Flight Radar No.</span>
              <span class="item-val" style="color: #60A5FA;">${booking.flightNumber}</span>
            </div>` : ""}
            ${booking.isReturn ? `
            <div class="item">
              <span class="item-label">Return Date &amp; Time</span>
              <span class="item-val">${booking.returnDate} at ${booking.returnTime}</span>
            </div>` : ""}
            <div class="item">
              <span class="item-label">Capacity</span>
              <span class="item-val">${booking.passengers} Passengers &middot; ${booking.luggage} Bags</span>
            </div>
          </div>

          <!-- Payment & Revenue -->
          <div class="section-box" style="background: linear-gradient(135deg, #1C190F 0%, #17171E 100%); border-color: rgba(212, 175, 55, 0.4);">
            <div class="section-title">💰 Financial Breakdown</div>
            <div class="item">
              <span class="item-label">Total Fare</span>
              <span class="item-val" style="font-size: 18px; color: #D4AF37;">£${booking.estimatedFare.toFixed(2)}</span>
            </div>
            <div class="item">
              <span class="item-label">Payment Method</span>
              <span class="item-val">${booking.paymentMethod.toUpperCase()}</span>
            </div>
            <div class="item">
              <span class="item-label">Payment Status</span>
              <span class="item-val" style="color: ${isCardPaid ? "#34D399" : "#FBBF24"};">
                ${isCardPaid ? "PAID (STRIPE ONLINE) ✓" : "HAND CASH (COLLECT ON TRIP)"}
              </span>
            </div>
          </div>

          ${booking.specialRequests ? `
          <div class="section-box">
            <div class="section-title">📝 Passenger Notes</div>
            <p style="margin: 0; font-size: 13px; color: #CCCCCC;">${booking.specialRequests}</p>
          </div>` : ""}
        </div>

        <div class="footer">
          <p style="margin: 0;">Oracle Private Hire Dispatch System &middot; Automated Internal Alert</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // 1. Dispatch Customer Voucher
  await transporter.sendMail({
    from: config.from,
    to: booking.passengerEmail,
    subject: `Booking Confirmed [${booking.bookingRef}] — Oracle Private Hire VIP Chauffeur`,
    html: customerHtml,
  });

  // 2. Dispatch Admin Alert
  if (config.notificationEmail) {
    await transporter.sendMail({
      from: config.from,
      to: config.notificationEmail,
      subject: `🚨 [NEW DISPATCH ALERT] ${booking.bookingRef} — ${booking.passengerName} (£${booking.estimatedFare.toFixed(2)})`,
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
  const transporter = await createTransporter(config);

  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; background: #0B0B0C; color: #fff; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #141418; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
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

export async function sendPasswordResetEmail(params: {
  email: string;
  name: string;
  otpCode: string;
  resetToken: string;
}) {
  const { email, name, otpCode, resetToken } = params;
  const config = await getSmtpConfig();
  const transporter = await createTransporter(config);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetLink = `${appUrl}/admin/reset-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(email)}`;

  const resetHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #08080A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
    <div style="width: 100%; background-color: #08080A; padding: 30px 10px;">
      <div style="max-width: 580px; margin: 0 auto; background-color: #121216; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.9);">
        <!-- Header -->
        <div style="background: linear-gradient(180deg, #1C1910 0%, #121216 100%); padding: 35px 25px 25px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.25);">
          <h1 style="color: #D4AF37; font-size: 22px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin: 0;">ORACLE PRIVATE HIRE</h1>
          <p style="color: #8E8E98; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 5px;">Admin Security &amp; Authentication</p>
        </div>

        <div style="padding: 30px 25px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #FFFFFF; margin: 0 0 10px;">Hello ${name},</h2>
          <p style="color: #A8A8B3; font-size: 13px; line-height: 1.6; margin: 0 0 20px;">
            We received a request to reset your administrator password for Oracle Private Hire. Use the 6-digit verification code below or click the direct reset button:
          </p>

          <!-- 6-digit OTP Code Box -->
          <div style="background: linear-gradient(135deg, #241F14 0%, #17171C 100%); border: 1px solid #D4AF37; border-radius: 14px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #D4AF37; font-weight: 700; display: block; margin-bottom: 6px;">Your 6-Digit Verification Code</span>
            <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #FFFFFF; font-family: monospace;">${otpCode}</div>
            <span style="font-size: 11px; color: #9E9EA8; display: block; margin-top: 6px;">Valid for the next 15 minutes</span>
          </div>

          <!-- 1-Click Reset Link Button -->
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #F4E0A5 0%, #D4AF37 50%, #AA820A 100%); color: #08080A; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 28px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 30px rgba(212,175,55,0.4);">
              Reset Password Online &rarr;
            </a>
          </div>

          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #D4AF37; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-top: 20px; font-size: 12px; color: #9E9EA7; line-height: 1.5;">
            <strong>Security Notice:</strong> If you did not request this password reset, please ignore this email or notify your system administrator immediately. Your password will remain unchanged.
          </div>
        </div>

        <div style="background-color: #0A0A0D; padding: 18px 20px; text-align: center; font-size: 11px; color: #6E6E78; border-top: 1px solid rgba(255, 255, 255, 0.05);">
          <p style="margin: 0;">&copy; Oracle Private Hire United Kingdom &middot; Security Protocol</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: config.from,
    to: email,
    subject: `🔐 Password Reset Request [Code: ${otpCode}] — Oracle Private Hire Admin`,
    html: resetHtml,
  });

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
      <div style="background: #0B0B0C; color: #fff; padding: 30px; font-family: sans-serif; border-radius: 12px; border: 1px solid #D4AF37; max-width: 500px; margin: auto;">
        <h2 style="color: #D4AF37; margin-top: 0;">Oracle Mail Connection Verified!</h2>
        <p>This is a live test email verifying that your Oracle Private Hire email dispatch system is operational.</p>
        <p style="color: #888; font-size: 12px;">Dispatched at: ${new Date().toISOString()}</p>
      </div>
    `,
  });

  return info;
}


