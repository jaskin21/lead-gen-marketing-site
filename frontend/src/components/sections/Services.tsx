const services = [
  {
    title: "SEO",
    description: "Rank higher and drive organic traffic that converts.",
  },
  {
    title: "Paid ads",
    description: "Google and Meta campaigns tuned for ROI, not just clicks.",
  },
  {
    title: "Content & email",
    description: "Nurture leads with content that actually gets read.",
  },
];

export default function Services() {
  return (
    <section
      className="px-6 py-16 bg-gray-50"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="text-2xl font-bold text-center mb-10"
      >
        What we do
      </h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
