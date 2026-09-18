import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 rounded-card border-2 border-dashed border-accent/40 bg-accent/5 p-6">
      <div className="no-print flex items-center gap-2 text-sm font-semibold text-accent">
        <span aria-hidden="true">⚙</span>
        Admin area — access control coming in Week 05
      </div>
      {children}
    </div>
  );
}
