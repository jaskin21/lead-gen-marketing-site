import Button from "../ui/Button";

const plans = [
  {
    name: "Starter",
    price: "$499",
    cadence: "/mo",
    description: "For getting the fundamentals right.",
    features: ["SEO audit & fixes", "Monthly performance report", "Email support"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$999",
    cadence: "/mo",
    description: "For teams ready to put budget behind what works.",
    features: [
      "Everything in Starter",
      "Paid ads management",
      "Priority support & strategy calls",
    ],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#F5F6FA] px-6 py-20" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-4xl">
        <h2
          id="pricing-heading"
          className="font-display mb-12 max-w-sm text-2xl font-[600] text-[#12172B] md:text-3xl"
        >
          Two plans, no surprise line items
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 transition-transform duration-150 hover:-translate-y-1 ${
                plan.featured
                  ? "bg-[#12172B] text-white"
                  : "border border-[#E2E4ED] bg-white text-[#12172B]"
              }`}
            >
              <h3 className="mb-1 font-[600] text-lg">{plan.name}</h3>
              <p className={`mb-6 text-sm ${plan.featured ? "text-white/60" : "text-[#4B5169]"}`}>
                {plan.description}
              </p>
              <p className="mb-6">
                <span className="font-display text-3xl font-[700]">{plan.price}</span>
                <span className={plan.featured ? "text-white/60" : "text-[#4B5169]"}>
                  {plan.cadence}
                </span>
              </p>
              <ul className="mb-8 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12l4 4 10-10"
                        stroke={plan.featured ? "#F5A623" : "#059669"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={plan.featured ? "text-white/85" : "text-[#4B5169]"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="#lead-form">
                <Button variant={plan.featured ? "primary" : "ghost"} className="w-full">
                  Talk to us about {plan.name}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
