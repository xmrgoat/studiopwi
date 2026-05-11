import { Resend } from "resend";
import { env } from "./env";

const resend = new Resend(env.RESEND_API_KEY);

type LeadEmailInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  tier?: string;
  source: string;
};

export async function sendLeadNotification(input: LeadEmailInput) {
  const subject = input.tier
    ? `Nouveau lead [${input.tier.toUpperCase()}] — ${input.name}`
    : `Nouveau lead — ${input.name}`;

  return resend.emails.send({
    from: env.RESEND_FROM,
    to: env.LEADS_TO,
    replyTo: input.email,
    subject,
    text: [
      `Nom    : ${input.name}`,
      `Email  : ${input.email}`,
      input.company ? `Société: ${input.company}` : null,
      input.tier ? `Tier   : ${input.tier}` : null,
      `Source : ${input.source}`,
      "",
      "Message :",
      input.message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });
}

export async function sendNewsletterConfirmation(opts: {
  to: string;
  confirmUrl: string;
}) {
  return resend.emails.send({
    from: env.RESEND_FROM,
    to: opts.to,
    subject: "Confirmez votre abonnement",
    text: [
      "Merci de votre inscription.",
      "",
      "Cliquez pour confirmer :",
      opts.confirmUrl,
      "",
      "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.",
    ].join("\n"),
  });
}
