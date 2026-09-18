"use client";

export default function PrintButton() {
  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='no-print rounded-md border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
      Print program
    </button>
  );
}
