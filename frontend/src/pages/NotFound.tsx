import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <main className="p-8">
      <Helmet>
        <title>Page Not Found — Brightly Digital</title>
      </Helmet>
      <h1 className="text-2xl font-bold">404 — Page not found</h1>
    </main>
  );
}
