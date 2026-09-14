export default function Hero() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto grid gap-10 md:grid-cols-2 md:items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4">
          Grow your business with data-driven digital marketing
        </h1>
        <p className="text-gray-600 mb-8">
          We help small and mid-sized companies turn traffic into paying
          customers, without the guesswork.
        </p>
        <a
          href="#lead-form"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700"
        >
          Get a free consultation
        </a>
      </div>

      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        alt="Team analyzing marketing performance data on a laptop"
        width={800}
        height={533}
        loading="eager"
        fetchPriority="high"
        className="rounded-lg w-full h-auto object-cover"
      />
    </section>
  );
}
