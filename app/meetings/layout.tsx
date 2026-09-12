import Link from "next/link";
import type {ReactNode} from "react";

export default function MeetingsLayout({children}: {children: ReactNode}) {
  return (
    <div className='space-y-6'>
      <nav className='no-print flex items-center gap-2 border-b border-border pb-3 text-sm'>
        <span className='mr-1 font-serif text-lg font-semibold text-foreground'>
          Meetings
        </span>
        <Link
          href='/meetings'
          className='rounded-md px-3 py-1.5 font-medium text-primary hover:bg-primary/10'>
          All
        </Link>
        <Link
          href='/meetings/current'
          className='rounded-md px-3 py-1.5 font-medium text-primary hover:bg-primary/10'>
          This week
        </Link>
      </nav>
      {children}
    </div>
  );
}
