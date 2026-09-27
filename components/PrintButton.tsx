"use client";

/** Opens the browser's print dialog, where the poster can also be saved as a PDF. */
export default function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="btn btn--solid" onClick={() => window.print()}>
      {children}
    </button>
  );
}
