export const createWelcomeEmailTemplate = (clientURL: string, name: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Whispry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #111827;">

  <!-- Wrapper Table for Outlook compatibility -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">

          <!-- Header Section -->
          <tr>
            <td style="padding: 40px; background: linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%); background-color: #4f46e5; border-radius: 12px 12px 0 0;">
              <!-- Minimal Text Logo (Easily swappable with an <img />) -->
              <div style="display: inline-block; background-color: #ffffff; color: #4f46e5; width: 40px; height: 40px; line-height: 40px; text-align: center; border-radius: 8px; font-weight: 700; font-size: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                M
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 40px 30px 40px;">
              <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 24px 0; color: #111827; letter-spacing: -0.5px;">
                Welcome to Whispry.
              </h1>

              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                Hello ${name},
              </p>

              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                We're excited to have you join us! Whispry connects you with friends, family, and colleagues in real-time, no matter where they are. Enjoy a clean, fast, and secure way to communicate.
              </p>

              <!-- Clean List Box -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 32px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 16px 0; font-size: 13px; font-weight: 600; color: #111827; text-transform: uppercase; letter-spacing: 0.5px;">
                  Next steps
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 8px;">Set up your profile picture</li>
                  <li style="margin-bottom: 8px;">Find and add your contacts</li>
                  <li style="margin-bottom: 8px;">Start a conversation</li>
                  <li style="margin-bottom: 0;">Share photos, videos, and more</li>
                </ul>
              </div>

              <!-- Call to Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center" style="border-radius: 6px;" bgcolor="#111827">
                    <a href=${clientURL} target="_blank" style="font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 14px 28px; border: 1px solid #111827; display: inline-block;">
                      Open Whispry
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                If you need any help or have questions, we're always here to assist you. Happy messaging!
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #111827; font-weight: 500;">
                — The Whispry Team
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer Section -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <tr>
            <td style="padding: 32px 40px; text-align: center; font-size: 13px; line-height: 1.6; color: #6b7280;">
              <p style="margin: 0 0 12px 0;">
                © 2026 Whispry. All rights reserved.
              </p>
              <p style="margin: 0;">
                <a href="#" style="color: #6b7280; text-decoration: underline; margin: 0 8px;">Privacy Policy</a>
                <a href="#" style="color: #6b7280; text-decoration: underline; margin: 0 8px;">Terms of Service</a>
                <a href="#" style="color: #6b7280; text-decoration: underline; margin: 0 8px;">Contact Us</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}