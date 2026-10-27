import { Fragment } from "react";
import Link from "next/link";

/** Renders the two pieces of markup prose in lib/ data files may use:
 *  **bold** and [link text](/path). Anything else is plain text. */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = /^\*\*(.+)\*\*$/.exec(part);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        const link = /^\[(.+)\]\((.+)\)$/.exec(part);
        if (link) return <Link key={i} href={link[2]}>{link[1]}</Link>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
