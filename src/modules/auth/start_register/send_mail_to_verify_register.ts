import { resend } from "../../../services/emails/resend.ts";

export const send_mail_to_verify_register = async (to: string, link: string) => {
  return await resend({
    from: "on-behalf-of@resend.dev",
    to,
    subject: "Vericar email 📬 NCS 📬",
    html: `<a 
    href=${link} 
    rel="noopener noreferrer" 
    style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;"
    >Clic aquí para verificar ✅ su registro.</a>`,
  });
};
