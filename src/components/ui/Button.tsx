import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Magnetic from "@/components/motion/Magnetic";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
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
  const className = cn(styles.btn, styles[variant], props.className);

  const inner = (
    <span className={styles.inner}>
      {props.children}
      {variant === "primary" && (
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
      )}
    </span>
  );

  const wrap = (node: ReactNode) =>
    props.magnetic ? <Magnetic strength={0.2}>{node}</Magnetic> : node;

  if ("href" in props && props.href) {
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
