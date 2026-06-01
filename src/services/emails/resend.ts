import { RESEND_API_KEY } from "@/app/config.ts";

export const resend = async (body: object) => {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
};

/* resend en gratis solo deja enviar emails al dueño para testear*/
