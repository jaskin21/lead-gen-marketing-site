const testimonials = [
  {
    quote:
      "Our lead volume doubled within two months, and we could finally see why.",
    name: "Maria Delgado",
    role: "Founder",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote:
      "Finally, a marketing partner that shows real numbers instead of vanity metrics.",
    name: "Marcus Cole",
    role: "Operations Lead",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white px-6 py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="testimonials-heading"
          className="font-display mb-12 max-w-sm text-2xl font-[600] text-[#12172B] md:text-3xl"
        >
          What clients notice first
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-l-2 border-[#F5A623] pl-6">
              <blockquote>
                <p className="font-display mb-5 text-lg leading-snug text-[#12172B]">
                  "{t.quote}"
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-[#12172B]">
                    {t.name}
                  </span>
                  <span className="text-xs text-[#8A8FA3]">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
