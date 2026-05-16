import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site studiopwi.com — identité de l'éditeur, hébergement, propriété intellectuelle et droit applicable.",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  return (
    <LegalPage
      eyebrow="Légal — Impressum"
      title="Mentions légales"
      updated="16 mai 2026"
    >
      <p>
        Conformément aux dispositions légales suisses applicables aux sites web à
        caractère commercial, les présentes mentions légales identifient le
        responsable de la publication et de l&apos;exploitation du site{" "}
        <strong>studiopwi.com</strong>.
      </p>

      <h2>1. Éditeur du site</h2>
      <address>
        <strong>Studio PWI</strong>
        <br />
        Rue de la Treille 2<br />
        2000 Neuchâtel — Suisse
        <br />
        <br />
        <strong>E-mail :</strong>{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
        <br />
        <strong>Site web :</strong>{" "}
        <a href="https://studiopwi.com">studiopwi.com</a>
      </address>

      <h2>2. Responsable de la publication</h2>
      <p>
        Le responsable de la publication est le fondateur de Studio PWI. Pour toute
        question éditoriale, contactez{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>.
      </p>

      <h2>3. Forme juridique et registre du commerce</h2>
      <p>
        Studio PWI est une raison individuelle au sens du Code des obligations
        suisse (CO). L&apos;inscription au Registre du commerce du canton de Neuchâtel
        est effectuée conformément aux obligations légales en vigueur.
      </p>
      <p>
        <strong>N° IDE (CHE) :</strong> en cours d&apos;enregistrement
        <br />
        <strong>Assujettissement TVA :</strong> non assujetti (chiffre d&apos;affaires
        inférieur au seuil légal de CHF&nbsp;100&apos;000 — art.&nbsp;10 LTVA)
      </p>

      <h2>4. Hébergement</h2>
      <p>
        Le site studiopwi.com est hébergé sur un serveur privé virtuel (VPS) géré
        par Studio PWI. Pour toute question relative à l&apos;infrastructure technique,
        contactez{" "}
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu de ce site — textes, graphismes, photographies,
        vidéos, logo, architecture, code source — est la propriété exclusive de
        Studio PWI ou de ses partenaires, et est protégé par la{" "}
        <strong>
          Loi fédérale suisse sur le droit d&apos;auteur et les droits voisins (LDA,
          RS 231.1)
        </strong>
        .
      </p>
      <p>
        Toute reproduction, représentation, modification, distribution ou
        exploitation, totale ou partielle, de ces éléments sans l&apos;accord écrit
        préalable de Studio PWI est strictement interdite et susceptible de
        constituer une violation des droits d&apos;auteur.
      </p>

      <h2>6. Exactitude des informations</h2>
      <p>
        Studio PWI s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour régulière
        des informations diffusées sur ce site. Toutefois, Studio PWI ne peut
        garantir l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité de ces informations
        et décline toute responsabilité pour les erreurs ou omissions éventuelles.
      </p>

      <h2>7. Liens hypertextes</h2>
      <p>
        Le Site peut contenir des liens vers des sites internet tiers. Ces liens
        sont proposés à titre informatif. Studio PWI ne contrôle pas ces sites et
        n&apos;assume aucune responsabilité quant à leur contenu, leur exactitude ou
        leur conformité aux lois applicables.
      </p>

      <h2>8. Protection des données personnelles</h2>
      <p>
        Le traitement des données personnelles effectué dans le cadre de
        l&apos;utilisation du Site est décrit dans notre{" "}
        <a href="/privacy">Politique de confidentialité</a>, conforme à la nouvelle
        Loi fédérale sur la protection des données (nLPD, RS 235.1), en vigueur
        depuis le 1<sup>er</sup> septembre 2023, et au Règlement général sur la
        protection des données (RGPD, UE 2016/679).
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Le présent site et les présentes mentions légales sont soumis au{" "}
        <strong>droit suisse</strong>. Tout litige relatif à l&apos;utilisation du Site
        sera soumis à la compétence exclusive des{" "}
        <strong>tribunaux du canton de Neuchâtel</strong>, sous réserve d&apos;un
        recours au Tribunal fédéral suisse.
      </p>

      <h2>10. Références légales</h2>
      <ul>
        <li>
          Code des obligations suisse (CO, RS 220)
        </li>
        <li>
          Loi fédérale sur le droit d&apos;auteur et les droits voisins (LDA,
          RS 231.1)
        </li>
        <li>
          Loi fédérale contre la concurrence déloyale (LCD, RS 241)
        </li>
        <li>
          Nouvelle Loi fédérale sur la protection des données (nLPD, RS 235.1)
        </li>
        <li>
          Loi fédérale régissant la taxe sur la valeur ajoutée (LTVA, RS 641.20)
        </li>
      </ul>

      <h2>11. Contact</h2>
      <p>
        Pour toute demande relative aux présentes mentions légales ou à l&apos;usage du
        Site :
      </p>
      <address>
        <strong>Studio PWI</strong>
        <br />
        Rue de la Treille 2, 2000 Neuchâtel, Suisse
        <br />
        <a href="mailto:contact@studiopwi.com">contact@studiopwi.com</a>
      </address>
    </LegalPage>
  );
}
