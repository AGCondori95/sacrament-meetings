interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <section className="space-y-2">
      <h1>Edit Meeting #{id} — Coming in Week 04</h1>
      <p className="text-muted">
        This form will let leaders edit an existing sacrament meeting record
        once the mutation endpoints are wired up in Week 04.
      </p>
    </section>
  );
}
