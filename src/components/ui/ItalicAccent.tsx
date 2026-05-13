import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ItalicAccent({ children }: Props) {
  return <span className="accent">{children}</span>;
}
