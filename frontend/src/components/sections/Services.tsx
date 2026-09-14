const services = [
  {
    title: "SEO",
    description:
      "Rank for the searches your customers already use, and keep that traffic converting.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6" stroke="#12172B" strokeWidth="1.6" />
        <path
          d="M20 20l-4.5-4.5"
          stroke="#12172B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Paid ads",
    description:
      "Google and Meta campaigns managed for return on spend, with a monthly breakdown of what worked.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 18V10M12 18V4M20 18v-6"
          stroke="#12172B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Content & email",
    description:
      "Content and lifecycle emails written to move a reader from curious to booked.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="2"
          stroke="#12172B"
          strokeWidth="1.6"
        />
        <path
          d="M4 7l8 6 8-6"
          stroke="#12172B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#F5F6FA] px-6 py-20"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="services-heading"
          className="font-display mb-12 max-w-sm text-2xl font-[600] text-[#12172B] md:text-3xl"
        >
          Three ways we move the number that matters
        </h2>

        <div className="divide-y divide-[#E2E4ED] border-y border-[#E2E4ED]">
          {services.map((service) => (
            <div
              key={service.title}
              className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623]/15">
                {service.icon}
              </div>
              <div>
                <h3 className="mb-1 font-[600] text-[#12172B]">
                  {service.title}
                </h3>
                <p className="max-w-md text-sm text-[#4B5169]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
