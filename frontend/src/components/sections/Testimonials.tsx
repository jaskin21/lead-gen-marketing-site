const testimonials = [
  {
    quote: "Our lead volume doubled within two months.",
    name: "A. Rivera, Founder",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote: "Finally, a marketing partner that shows real numbers.",
    name: "J. Tran, Operations Lead",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-16" aria-labelledby="testimonials-heading">
      <h2
        id="testimonials-heading"
        className="text-2xl font-bold text-center mb-10"
      >
        What our clients say
      </h2>
      <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex gap-4 items-start border-l-4 border-blue-600 pl-4"
          >
            <img
              src={t.avatar}
              alt={`Portrait of ${t.name}`}
              width={48}
              height={48}
              loading="lazy"
              className="rounded-full w-12 h-12 object-cover flex-shrink-0"
            />
            <blockquote>
              <p className="italic text-gray-700 mb-2">"{t.quote}"</p>
              <cite className="text-sm text-gray-500 not-italic">
                — {t.name}
              </cite>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
