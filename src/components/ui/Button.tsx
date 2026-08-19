import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Magnetic from "@/components/motion/Magnetic";
import styles from "./Button.module.css";

// The design ships exactly two CTA treatments: an accent fill (#2cff05) and an
// ink outline on the page ground. Both carry ink-coloured uppercase label text
// — the accent is never used *as* text, only underneath it.
type Variant = "primary" | "outline";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
  /** Stretch to the container width — service cards and every mobile CTA. */
  fullWidth?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
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
    props.className,
  );

  const inner = <span className={styles.inner}>{props.children}</span>;

  const wrap = (node: ReactNode) =>
    props.magnetic ? <Magnetic strength={0.2}>{node}</Magnetic> : node;

  if ("href" in props && props.href) {
    // Hash-only links (#contact, #services, …) must use a plain <a> so the
    // browser (and the SmoothScroll anchor handler) handles them natively.
    // Next.js <Link> triggers a client-side route transition whose default
    // scroll:true resets the window to the top before the anchor can resolve,
    // sending the user to the hero instead of the target section.
    if (props.href.startsWith("#")) {
      return wrap(
        <a href={props.href} className={className}>
          {inner}
        </a>,
      );
    }
    return wrap(
      <Link href={props.href} className={className}>
        {inner}
      </Link>,
    );
  }

  return wrap(
    <button
      type={props.type ?? "button"}
      className={className}
      onClick={"onClick" in props ? props.onClick : undefined}
      disabled={"disabled" in props ? props.disabled : undefined}
    >
      {inner}
    </button>,
  );
}
