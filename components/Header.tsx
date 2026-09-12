import Link from "next/link";
import NavLinks from "./NavLinks";

const WARD_NAME = "Willow Creek Ward";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className='bg-primary text-white'>
      <div className='mx-auto flex max-w-4xl flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <Link href='/' className='text-xl font-semibold tracking-tight'>
            {WARD_NAME}
          </Link>
          <p className='text-sm text-white/70'>Sacrament Meeting Planner</p>
        </div>
        <div className='text-sm text-white/80'>{today}</div>
      </div>
      <div className='bg-primary-light'>
        <div className='mx-auto max-w-4xl px-6'>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
