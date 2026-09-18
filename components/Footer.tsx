const WARD_NAME = "Willow Creek Ward";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='no-print border-t border-border bg-surface'>
      <div className='mx-auto max-w-4xl px-6 py-4 text-center text-sm text-muted'>
        © {year} {WARD_NAME} · Sacrament Meeting Planner
      </div>
    </footer>
  );
}
