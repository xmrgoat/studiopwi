import { Resend } from "resend";
import { env } from "./env";

const resend = new Resend(env.RESEND_API_KEY);

type LeadEmailInput = {
  name: string;
  email: string;
  phone?: string;
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
      input.phone ? `Tél.   : ${input.phone}` : null,
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

type AuditEmailInput = {
  name: string;
  company: string;
  email: string;
  site: string;
  noSite: boolean;
};

// An audit request: its own subject prefix so it can be filtered apart from
// contact leads, and the site first, since it is the work to be done.
export async function sendAuditRequest(input: AuditEmailInput) {
  const site = input.noSite ? "pas de site" : input.site;
  return resend.emails.send({
    from: env.RESEND_FROM,
    to: env.LEADS_TO,
    replyTo: input.email,
    subject: `Demande d'audit — ${input.company} (${site})`,
    text: [
      `Site      : ${site}`,
      `Entreprise: ${input.company}`,
      `Nom       : ${input.name}`,
      `Email     : ${input.email}`,
      "",
      input.noSite
        ? "Pas de site : partir de la fiche Google de l'entreprise."
        : null,
      "À livrer : audit PDF sous 1 à 2 jours ouvrables, maquette de la page d'accueil sous 1 à 3 jours ouvrables.",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });
}
