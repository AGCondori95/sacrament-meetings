import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className='space-y-8'>
      {/* Hero image: width + height set to reserve space and prevent layout shift.
          priority preloads it since it's the largest above-the-fold element. */}
      <section className='overflow-hidden rounded-card border border-border shadow-sm'>
        <Image
          src='/hero.svg'
          alt='Illustration of a chapel with a steeple under an evening sky'
          width={1200}
          height={420}
          priority
          className='h-auto w-full'
        />
      </section>

      <section className='space-y-4 text-center'>
        <h1>Welcome to the Sacrament Meeting Planner</h1>
        <p className='mx-auto max-w-2xl text-muted'>
          Plan, manage, and print weekly sacrament meeting programs for the
          ward. Browse past and current agendas — including hymns, prayers,
          speakers, and ward business.
        </p>
        <div className='flex justify-center gap-3'>
          <Link
            href='/meetings'
            className='rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-light'>
            View all meetings
          </Link>
          <Link
            href='/meetings/current'
            className='rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/40'>
            This week&rsquo;s program
          </Link>
        </div>
      </section>
    </div>
  );
}
