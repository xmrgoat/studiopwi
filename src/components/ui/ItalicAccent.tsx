import type { ReactNode } from "react";

type Props = {
  /** Word or short phrase set in Fraunces Italic 300 + brand color. §8.2 */
  children: ReactNode;
};

export default function ItalicAccent({ children }: Props) {
  return <span className="accent">{children}</span>;
}
