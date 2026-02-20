import { resend, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (name: string, email: string, clientURL: string) => {
    const { data, error } = await resend.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to Whispry',
        html: createWelcomeEmailTemplate(clientURL, name),
    });

    if (!data) {
        console.error("Error sending welcome email ::", error);
        throw new Error("Failed to send welcome email ::");

    }
    console.log(`Email ${data.id} sent successfully.`);
}