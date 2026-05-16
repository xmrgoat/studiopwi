import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Studio PWI collecte, traite et protège vos données personnelles, conformément à la nLPD suisse et au RGPD européen.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Légal — Données personnelles"
      title="Politique de confidentialité"
      updated="16 mai 2026"
    >
      <p>
        La présente politique de confidentialité décrit comment Studio PWI (ci-après
        «&nbsp;nous&nbsp;», «&nbsp;notre&nbsp;» ou «&nbsp;Studio PWI&nbsp;») collecte, utilise et
        protège vos données personnelles lorsque vous visitez{" "}
        <strong>studiopwi.com</strong> ou utilisez nos services.
      </p>
      <p>
        Elle est conforme à la{" "}
        <strong>
          nouvelle Loi fédérale suisse sur la protection des données (nLPD)
        </strong>{" "}
        en vigueur depuis le 1<sup>er</sup> septembre 2023, ainsi qu&apos;au{" "}
        <strong>Règlement général sur la protection des données (RGPD)</strong> de
        l&apos;Union européenne, applicable aux visiteurs résidant dans l&apos;UE.
      </p>

      <h2>1. Responsable du traitement</h2>
      <address>
        <strong>Studio PWI</strong>
        <br />
        Rue de la Treille 2<br />
        2000 Neuchâtel — Suisse
        <br />
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
      </address>

      <h2>2. Données personnelles collectées</h2>

      <h3>Formulaire de contact</h3>
      <p>
        Lorsque vous soumettez une demande via notre formulaire de contact, nous
        collectons les données suivantes :
      </p>
      <ul>
        <li>
          <strong>Nom et prénom</strong> — identification de la demande
        </li>
        <li>
          <strong>Adresse e-mail</strong> — pour vous répondre
        </li>
        <li>
          <strong>Nom de l&apos;entreprise</strong> (optionnel)
        </li>
        <li>
          <strong>Message</strong>
        </li>
        <li>
          <strong>Offre d&apos;intérêt</strong> (optionnel — Lancement, Croissance ou
          Partenariat)
        </li>
        <li>
          <strong>Adresse IP et User-Agent</strong> — à des fins de sécurité
          (prévention des abus) et de journalisation technique
        </li>
      </ul>

      <h3>Formulaire d&apos;inscription à la newsletter</h3>
      <ul>
        <li>
          <strong>Adresse e-mail</strong>
        </li>
      </ul>
      <p>
        L&apos;inscription est soumise à un double opt-in : vous recevez un e-mail de
        confirmation avant toute communication commerciale.
      </p>

      <h3>Données de navigation</h3>
      <p>
        Notre serveur enregistre automatiquement des journaux techniques (logs)
        contenant : adresse IP, navigateur, pages consultées, date et heure des
        accès. Ces données sont utilisées exclusivement pour assurer la sécurité et
        la stabilité du site.
      </p>

      <h2>3. Finalités et bases juridiques du traitement</h2>

      <ul>
        <li>
          <strong>Répondre à vos demandes de contact</strong> — base : exécution de
          mesures précontractuelles (art. 6 al. 1 lit. b RGPD ; art. 31 nLPD)
        </li>
        <li>
          <strong>Envoi de la newsletter</strong> (si vous y avez souscrit) — base :
          consentement (art. 6 al. 1 lit. a RGPD ; art. 31 nLPD). Vous pouvez vous
          désabonner à tout moment via le lien présent dans chaque e-mail.
        </li>
        <li>
          <strong>Sécurité et prévention des abus</strong> — base : intérêt légitime
          (art. 6 al. 1 lit. f RGPD ; art. 31 nLPD)
        </li>
        <li>
          <strong>Respect des obligations légales</strong> — base : obligation légale
          (art. 6 al. 1 lit. c RGPD)
        </li>
      </ul>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>
        Vos données ne sont ni vendues ni partagées à des fins commerciales avec des
        tiers. Nous faisons appel aux prestataires suivants dans le cadre strict de
        nos services :
      </p>
      <ul>
        <li>
          <strong>Resend Inc.</strong> (envoi d&apos;e-mails transactionnels) — 2261
          Market Street #5668, San Francisco, CA 94114, États-Unis.{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité Resend
          </a>
          .
        </li>
        <li>
          <strong>Hébergeur VPS dédié</strong> — serveur situé en Europe sur lequel
          la base de données et le code applicatif sont hébergés.
        </li>
      </ul>
      <p>
        Des contrats de traitement de données (DPA) sont en place avec chaque
        sous-traitant conformément aux exigences de la nLPD et du RGPD.
      </p>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Demandes de contact</strong> : 3 ans à compter de la dernière
          interaction, sauf obligation légale de conservation plus longue.
        </li>
        <li>
          <strong>Abonnements newsletter</strong> : jusqu&apos;à votre désinscription,
          puis suppression dans un délai de 30 jours.
        </li>
        <li>
          <strong>Journaux techniques (logs)</strong> : 12 mois maximum.
        </li>
      </ul>

      <h2>6. Transferts internationaux de données</h2>
      <p>
        L&apos;envoi d&apos;e-mails via Resend implique un transfert de données vers les
        États-Unis. Ce transfert est encadré par les clauses contractuelles types
        (CCT) approuvées par la Commission européenne, conformément à l&apos;art. 16
        nLPD et à l&apos;art. 46 RGPD.
      </p>

      <h2>7. Vos droits</h2>
      <p>
        Conformément à la nLPD et au RGPD, vous disposez des droits suivants à
        l&apos;égard de vos données personnelles :
      </p>
      <ul>
        <li>
          <strong>Droit d&apos;accès</strong> — obtenir une copie de vos données
        </li>
        <li>
          <strong>Droit de rectification</strong> — corriger des données inexactes
        </li>
        <li>
          <strong>Droit à l&apos;effacement</strong> — demander la suppression de vos
          données («&nbsp;droit à l&apos;oubli&nbsp;»)
        </li>
        <li>
          <strong>Droit à la limitation du traitement</strong>
        </li>
        <li>
          <strong>Droit à la portabilité</strong> — recevoir vos données dans un
          format structuré
        </li>
        <li>
          <strong>Droit d&apos;opposition</strong> — vous opposer à un traitement fondé
          sur l&apos;intérêt légitime
        </li>
        <li>
          <strong>Droit de retrait du consentement</strong> — à tout moment, sans
          effet rétroactif
        </li>
      </ul>
      <p>
        Pour exercer l&apos;un de ces droits, contactez-nous par e-mail :{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>. Nous nous
        engageons à répondre dans un délai de 30 jours.
      </p>

      <h2>8. Droit de recours</h2>
      <p>
        Si vous estimez que vos droits n&apos;ont pas été respectés, vous pouvez
        introduire une réclamation auprès de l&apos;autorité de contrôle compétente :
      </p>
      <ul>
        <li>
          <strong>Suisse</strong> — Préposé fédéral à la protection des données et à
          la transparence (PFPDT) :{" "}
          <a
            href="https://www.pfpdt.admin.ch"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.pfpdt.admin.ch
          </a>
        </li>
        <li>
          <strong>Union européenne</strong> — autorité de contrôle de votre État
          membre de résidence
        </li>
      </ul>

      <h2>9. Cookies</h2>
      <p>
        Ce site n&apos;utilise <strong>aucun cookie publicitaire ou de traçage tiers</strong>.
        Seuls des cookies techniques strictement nécessaires au fonctionnement du
        site peuvent être déposés (session, sécurité CSRF). Ces cookies ne
        nécessitent pas votre consentement.
      </p>

      <h2>10. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles adaptées
        pour protéger vos données contre tout accès non autorisé, perte ou
        divulgation : connexions chiffrées (TLS), accès restreint aux bases de
        données, limitation de débit sur les API.
      </p>

      <h2>11. Modifications de cette politique</h2>
      <p>
        Nous nous réservons le droit de modifier la présente politique à tout moment.
        La version en vigueur est celle publiée sur cette page, avec sa date de mise
        à jour. En cas de modifications substantielles, nous vous en informerons par
        e-mail si vous êtes abonné à notre newsletter.
      </p>

      <h2>12. Contact</h2>
      <p>
        Pour toute question relative à la protection de vos données personnelles :
      </p>
      <address>
        Studio PWI — Responsable de la protection des données
        <br />
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
        <br />
        Rue de la Treille 2, 2000 Neuchâtel, Suisse
      </address>
    </LegalPage>
  );
}
