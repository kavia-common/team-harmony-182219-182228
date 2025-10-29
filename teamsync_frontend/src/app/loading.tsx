export default function RootLoading() {
  return (
    <div className="app-container py-10">
      <div className="rounded-xl border border-blue-100 bg-white/70 p-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span aria-hidden>⏳</span>
          <span>Loading…</span>
        </div>
      </div>
    </div>
  );
}
