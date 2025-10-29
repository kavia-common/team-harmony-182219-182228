export default function NotFound() {
  return (
    <main className="app-container py-16">
      <section
        className="ts-card ts-card-hover p-8 text-center"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="ts-heading text-3xl font-semibold">404 – Page Not Found</h1>
        <p className="ts-subtle mt-2">
          The page you’re looking for doesn’t exist. Please check the URL or head back home.
        </p>
      </section>
    </main>
  );
}
