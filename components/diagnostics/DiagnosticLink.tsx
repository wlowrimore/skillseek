"use client";

import Link from "next/link";
import { useEffect } from "react";

interface DiagnosticLinkProps {
  href?: string | undefined;
}

const DiagnosticLink: React.FC<DiagnosticLinkProps> = ({ href, ...props }) => {
  useEffect(() => {
    if (href === undefined) {
      console.warn("Undefined href detected", {
        props,
        stack: new Error().stack,
      });
    }
  }, [href]);

  // If href is undefined, return a fallback or handle gracefully
  if (href === undefined) {
    console.warn("Skipping Link rendering due to undefined href", props);
    return null;
  }

  return <Link href={href} {...props} />;
};

export default DiagnosticLink;
