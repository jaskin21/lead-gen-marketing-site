import { Helmet } from "react-helmet-async";

export default function ThankYou() {
  return (
    <main className="p-8">
      <Helmet>
        <title>Thank You — Brightly Digital</title>
        <meta
          name="description"
          content="Thanks for reaching out to Brightly Digital."
        />
      </Helmet>
      <h1 className="text-2xl font-bold">Thanks for reaching out!</h1>
      <p>We'll be in touch shortly.</p>
    </main>
  );
}
