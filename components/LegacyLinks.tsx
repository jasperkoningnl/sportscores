"use client";

import { useEffect } from "react";
import { LEGACY_IDS } from "@/lib/chapters";

/** Sends old numbered links (…/#ch-06) on to the chapter they meant. */
export default function LegacyLinks() {
  useEffect(() => {
    const redirect = () => {
      const target = LEGACY_IDS[window.location.hash.slice(1)];
      if (target) window.location.replace(`#${target}`);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, []);
  return null;
}
