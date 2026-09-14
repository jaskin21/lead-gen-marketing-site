const plans = [
  {
    name: "Starter",
    price: "$499/mo",
    features: ["SEO audit", "Monthly report", "Email support"],
  },
  {
    name: "Growth",
    price: "$999/mo",
    features: [
      "Everything in Starter",
      "Paid ads management",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      className="px-6 py-16 bg-gray-50"
      aria-labelledby="pricing-heading"
    >
      <h2 id="pricing-heading" className="text-2xl font-bold text-center mb-10">
        Simple pricing
      </h2>
      <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg bg-white p-6 shadow-sm text-center"
          >
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <p className="text-2xl font-bold my-2">{plan.price}</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
