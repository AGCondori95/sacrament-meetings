export default function Loading() {
  return (
    <div className='space-y-4' role='status' aria-live='polite'>
      <div className='h-6 w-40 animate-pulse rounded bg-border' />
      <div className='grid gap-4 sm:grid-cols-2'>
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className='h-32 animate-pulse rounded-card bg-border' />
        ))}
      </div>
      <span className='sr-only'>Loading meetings…</span>
    </div>
  );
}
