import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from django.conf import settings
def get_brevo_client():
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY

    return sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

def get_sender():
    return {
        "email": settings.BREVO_SENDER_EMAIL,
        "name": settings.BREVO_SENDER_NAME
    }

def send_email(email, subject, html_content):
    api_instance = get_brevo_client()
    email_data = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": email}],
        sender=get_sender(),
        subject=subject,
        html_content=html_content
    )
    try:
        api_instance.send_transac_email(email_data)
        print("Email sent to", email)
    except ApiException as e:
        print("Brevo API error: %s\n" % e)

def send_registration_otp(email, full_name, otp):
    send_email(
        email=email,
        subject="Verify Your Email for PashuSewa Registration",
        html_content=f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; color:#333;">
            <h2 style="color:#2e7d32;">Welcome to PashuSewa 🐾</h2>
            <p>Hello {full_name},</p>
            <p>Thank you for creating an account with <strong>PashuSewa</strong>. Please verify your email address to complete your registration.</p>
            <p><strong>Your One-Time Password (OTP):</strong></p>
            <div style="margin:20px 0;">
            <span style="
                font-size:26px;
                font-weight:bold;
                letter-spacing:4px;
                background:#f5f5f5;
                padding:10px 20px;
                border-radius:6px;
                display:inline-block;
            ">{otp}</span></div>
            <p>⏳ This OTP is valid for <strong>10 minutes</strong>.</p>
            <p>Do not share this OTP with anyone.</p>
            <p>If you did not request this registration, you may safely ignore this email.</p><hr>
            <p style="font-size:12px;color:#777;">This is an automated message. Please do not reply.</p>
            <p style="font-size:12px;color:#777;">© PashuSewa</p>
            <p style="font-size:12px;color:#777;">PashuSewa Security Team</p>
        </body>
        </html>
       """
    )

def send_login_unverified_otp(email, full_name, otp):
    send_email(
        email=email,
        subject="Verify Your Email to Access PashuSewa",
        html_content=f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; color:#333;">
            <h2 style="color:#d84315;">Email Verification Required</h2>
            <p>Hello {full_name},</p>
            <p>We noticed a login attempt on your <strong>PashuSewa</strong> account. However, your email address has not been verified yet.</p>
            <p>Please verify your email using the OTP below to continue:</p>
            <div style="margin:20px 0;">
            <span style="
                font-size:26px;
                font-weight:bold;
                letter-spacing:4px;
                background:#fff3e0;
                padding:10px 20px;
                border-radius:6px;
                display:inline-block;
            ">{otp}</span></div>
            <p>⏳ OTP is valid for <strong>10 minutes</strong>.</p>
            <p>Do not share this OTP with anyone.</p>
            <p>If this login attempt was not made by you, please ignore this email or contact our support team.</p><hr>
            <p style="font-size:12px;color:#777;">This is an automated message. Please do not reply.</p>
            <p style="font-size:12px;color:#777;">© PashuSewa</p>
            <p style="font-size:12px;color:#777;">PashuSewa Security Team</p>
        </body>
        </html>
        """
    )

def send_reset_password_otp(email, full_name, otp):
    send_email(
        email=email,
        subject="Reset Your PashuSewa Account Password",
        html_content=f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; color:#333;">
            <h2 style="color:#1565c0;">Password Reset Request</h2>
            <p>Hello {full_name},</p>
            <p>We received a request to reset the password for your <strong>PashuSewa</strong> account.</p>
            <p>Use the OTP below to reset your password:</p>
            <div style="margin:20px 0;">
            <span style="
                font-size:26px;
                font-weight:bold;
                letter-spacing:4px;
                background:#e3f2fd;
                padding:10px 20px;
                border-radius:6px;
                display:inline-block;
            ">{otp}</span></div>
            <p>⏳ This OTP is valid for <strong>10 minutes</strong>.</p>
            <p>Do not share this OTP with anyone.</p>
            <p>If you did not request a password reset, please ignore this email. Your account remains secure.</p><hr>
            <p style="font-size:12px;color:#777;">This is an automated message. Please do not reply.</p>
            <p style="font-size:12px;color:#777;">© PashuSewa</p>
            <p style="font-size:12px;color:#777;">PashuSewa Security Team</p>
        </body>
        </html>
        """
    )

# brevo_email.py
def send_admin_added_user_email(email, full_name, password):
    send_email(
        email=email,
        subject = "Welcome to PashuSewa - Account Created",
        html_content = f"""
            <html>
                <body>
                    <h1>Hello, {full_name}!</h1>
                    <p>An administrator has created an account for you on the PashuSewa Portal.</p>
                    <p><strong>Login Details:</strong></p>
                    <ul>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Temporary Password: </strong>{password}</li>
                    </ul>
                    <p>Please log in and reset your password immediately for security.</p>
                    <a href="http://127.0.0.1:3000/login" style= padding: 10px; background-color: #ff7a00; color: #ffffff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Login Now</a>
                </body>
            </html>
        """
    )