import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description:
    "Conditions générales d'utilisation du site studiopwi.com et des services de Studio PWI, soumises au droit suisse.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Légal — CGU"
      title="Conditions générales d'utilisation"
      updated="16 mai 2026"
    >
      <p>
        Les présentes Conditions générales d&apos;utilisation (ci-après «&nbsp;CGU&nbsp;»)
        régissent l&apos;accès et l&apos;utilisation du site web{" "}
        <strong>studiopwi.com</strong> (ci-après «&nbsp;le Site&nbsp;»), exploité par
        Studio PWI, dont le siège est à Rue de la Treille 2, 2000 Neuchâtel,
        Suisse.
      </p>

      <h2>1. Acceptation des CGU</h2>
      <p>
        L&apos;accès au Site et son utilisation valent acceptation pleine et entière
        des présentes CGU. Si vous n&apos;acceptez pas ces conditions, veuillez cesser
        d&apos;utiliser le Site immédiatement.
      </p>
      <p>
        Ces CGU s&apos;appliquent à tout visiteur du Site, qu&apos;il soit ou non client de
        Studio PWI. Les prestations commerciales font l&apos;objet de contrats séparés
        et de conditions générales de vente (CGV) qui prévalent en cas de
        contradiction.
      </p>

      <h2>2. Description du Site et des services</h2>
      <p>
        Le Site présente les services de Studio PWI, studio web spécialisé dans la
        création de sites internet à destination des paysagistes et entreprises de
        paysagisme en Suisse. Il permet notamment :
      </p>
      <ul>
        <li>De consulter les offres de services et les réalisations ;</li>
        <li>De soumettre une demande de contact ou de devis ;</li>
        <li>De s&apos;inscrire à la newsletter de Studio PWI.</li>
      </ul>
      <p>
        Les services de création de site web sont régis par des contrats de
        prestation conclus séparément. Les présentes CGU ne constituent pas un
        contrat de prestation.
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du Site — textes, images, vidéos, graphismes,
        logo, architecture, code source — est protégé par la{" "}
        <strong>
          Loi fédérale suisse sur le droit d&apos;auteur et les droits voisins (LDA)
        </strong>{" "}
        et, le cas échéant, par les lois sur la protection des marques et des
        designs.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication ou
        transmission de tout ou partie du Site, par quelque moyen que ce soit, sans
        l&apos;accord préalable écrit de Studio PWI, est strictement interdite et
        constitue une contrefaçon.
      </p>
      <p>
        Les logos et marques de tiers éventuellement présents sur le Site restent la
        propriété exclusive de leurs détenteurs respectifs.
      </p>

      <h2>4. Utilisation du Site</h2>
      <p>En utilisant le Site, vous vous engagez à :</p>
      <ul>
        <li>Ne pas soumettre de contenu faux, trompeur ou frauduleux ;</li>
        <li>
          Ne pas tenter d&apos;accéder de façon non autorisée aux systèmes informatiques
          du Site ;
        </li>
        <li>
          Ne pas utiliser de robots, scripts ou tout autre moyen automatisé pour
          extraire des données du Site sans autorisation écrite préalable ;
        </li>
        <li>
          Ne pas transmettre de virus, code malveillant ou tout contenu nuisible.
        </li>
      </ul>
      <p>
        Studio PWI se réserve le droit de bloquer l&apos;accès au Site à tout utilisateur
        qui ne respecterait pas ces conditions.
      </p>

      <h2>5. Limitation de responsabilité</h2>
      <p>
        Studio PWI s&apos;efforce d&apos;assurer l&apos;exactitude et l&apos;actualité des
        informations publiées sur le Site. Toutefois, ces informations sont fournies
        à titre indicatif et peuvent être modifiées à tout moment sans préavis.
      </p>
      <p>Studio PWI décline toute responsabilité pour :</p>
      <ul>
        <li>
          Les erreurs, inexactitudes ou omissions dans le contenu du Site ;
        </li>
        <li>
          L&apos;indisponibilité temporaire du Site due à des opérations de
          maintenance, une panne technique ou un cas de force majeure ;
        </li>
        <li>
          Les dommages directs ou indirects résultant de l&apos;utilisation du Site ou
          de l&apos;impossibilité d&apos;y accéder ;
        </li>
        <li>
          Les contenus ou pratiques des sites tiers accessibles via des liens
          présents sur le Site.
        </li>
      </ul>
      <p>
        La responsabilité de Studio PWI ne peut être engagée au-delà de ce que
        prévoit le droit suisse impératif applicable.
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers. Ces liens sont fournis
        à titre informatif uniquement. Studio PWI ne contrôle pas le contenu de ces
        sites et décline toute responsabilité quant à leurs pratiques en matière de
        confidentialité ou à leur conformité légale.
      </p>
      <p>
        La création de liens hypertextes pointant vers le Site est autorisée à
        condition que le lien soit clairement identifié et ne porte pas atteinte à
        l&apos;image de Studio PWI.
      </p>

      <h2>7. Conditions commerciales</h2>
      <p>
        Les prix affichés sur le Site sont indiqués en{" "}
        <strong>francs suisses (CHF)</strong>, hors taxe sur la valeur ajoutée (TVA)
        sauf mention contraire. La TVA applicable est celle en vigueur en Suisse au
        moment de la facturation.
      </p>
      <p>
        Les offres présentées sur le Site sont données à titre indicatif. Toute
        prestation fait l&apos;objet d&apos;un devis personnalisé et d&apos;un contrat écrit
        distinct. Aucune commande n&apos;est valide sans signature d&apos;un bon de
        commande ou d&apos;un contrat de prestation.
      </p>

      <h2>8. Protection des données personnelles</h2>
      <p>
        L&apos;utilisation du Site peut impliquer la collecte de données personnelles.
        Ces traitements sont décrits dans notre{" "}
        <a href="/privacy">Politique de confidentialité</a>, conforme à la nLPD et
        au RGPD.
      </p>

      <h2>9. Droit applicable et for judiciaire</h2>
      <p>
        Les présentes CGU sont régies exclusivement par le{" "}
        <strong>droit suisse</strong>, à l&apos;exclusion de toute règle de conflit de
        lois et de la Convention de Vienne sur les contrats de vente
        internationale.
      </p>
      <p>
        Tout litige relatif à l&apos;utilisation du Site ou à l&apos;interprétation des
        présentes CGU sera soumis à la compétence exclusive des{" "}
        <strong>tribunaux du canton de Neuchâtel</strong>, Suisse, sous réserve
        d&apos;un recours au Tribunal fédéral suisse.
      </p>
      <p>
        Si vous résidez dans l&apos;Union européenne, les dispositions impératives de
        protection des consommateurs de votre pays de résidence restent applicables.
      </p>

      <h2>10. Modifications des CGU</h2>
      <p>
        Studio PWI se réserve le droit de modifier les présentes CGU à tout moment.
        Les modifications entrent en vigueur dès leur publication sur le Site. La
        date de mise à jour figurant en haut de cette page fait foi.
      </p>
      <p>
        En continuant à utiliser le Site après une modification des CGU, vous en
        acceptez les nouvelles dispositions.
      </p>

      <h2>11. Dispositions diverses</h2>
      <p>
        Si une disposition des présentes CGU est déclarée nulle ou inapplicable par
        un tribunal compétent, les autres dispositions demeurent pleinement en
        vigueur.
      </p>
      <p>
        Le fait pour Studio PWI de ne pas se prévaloir d&apos;une disposition des CGU ne
        saurait être interprété comme une renonciation à s&apos;en prévaloir
        ultérieurement.
      </p>

      <h2>12. Contact</h2>
      <p>Pour toute question relative aux présentes CGU :</p>
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
