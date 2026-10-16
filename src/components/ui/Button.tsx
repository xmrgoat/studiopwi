import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

// The design ships exactly two CTA treatments: an accent fill (#2cff05) and an
// ink outline on the page ground. Both carry ink-coloured uppercase label text
// — the accent is never used *as* text, only underneath it.
type Variant = "primary" | "outline";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Stretch to the container width — service cards and every mobile CTA. */
  fullWidth?: boolean;
  /** Sweep the glint across once on load — reserved for the hero CTA, so
      one button on the page draws the eye rather than all of them. */
  shine?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
  /** Open off-site in a new tab (Calendly); the label gains a hidden note. */
  external?: boolean;
  /** Service tier the button stands for — ContactForm reads it on click to
      prefill the enquiry with the chosen offer. */
  offer?: string;
  type?: never;
  onClick?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

type Props = LinkProps | ButtonProps;

export default function Button(props: Props) {
  const variant: Variant = props.variant ?? "primary";
  const className = cn(
    styles.btn,
    styles[variant],
    props.fullWidth && styles.fullWidth,
    props.shine && styles.shine,
    props.className,
  );

  const inner = <span className={styles.inner}>{props.children}</span>;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.inner}>
            {props.children}
            <span className="sr-only"> (nouvel onglet)</span>
          </span>
        </a>
      );
    }
    // Hash-only links (#contact, #services, …) must use a plain <a> so the
    // browser (and the SmoothScroll anchor handler) handles them natively.
    // Next.js <Link> triggers a client-side route transition whose default
    // scroll:true resets the window to the top before the anchor can resolve,
    // sending the user to the hero instead of the target section.
    if (props.href.startsWith("#")) {
      return (
        <a href={props.href} className={className} data-offer={props.offer}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={className}
      onClick={"onClick" in props ? props.onClick : undefined}
      disabled={"disabled" in props ? props.disabled : undefined}
    >
      {inner}
    </button>
  );
}
