import { Fragment, type ReactNode } from "react";

/**
 * Renders `**bold**` spans inside otherwise plain content strings.
 *
 * The design emphasises fragments mid-paragraph ("plus de **20 sites web dans
 * des secteurs variés.**"), which the content files carry as markers so copy
 * stays free of JSX. Extracted from the old Problem section, which had the
 * same splitter inlined, so WhyUs and anything later can share it.
 *
 * Deliberately handles bold only — it is a copy convention, not a Markdown
 * renderer, and content is authored in this repo rather than user-supplied.
 */
export default function RichText({ text }: { text: string }): ReactNode {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
