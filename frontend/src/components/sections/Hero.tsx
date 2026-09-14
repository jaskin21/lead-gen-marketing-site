import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="top" className="bg-[#12172B] px-6 pb-24 pt-16 md:pb-32 md:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="font-display mb-6 animate-[hero-rise_0.7s_ease-out_both] text-4xl font-[600] leading-tight text-white md:text-5xl">
            Marketing that shows its work
          </h1>
          <p className="mb-8 max-w-md animate-[hero-rise_0.7s_ease-out_0.1s_both] text-lg text-white/70">
            We run SEO, paid ads, and content for small and mid-sized
            businesses — and report the numbers behind every decision, not
            just the highlights.
          </p>
          <div className="flex flex-wrap gap-4 animate-[hero-rise_0.7s_ease-out_0.2s_both]">
            <a href="#lead-form">
              <Button variant="primary">Get a free consultation</Button>
            </a>
            <a href="#services">
              <Button variant="secondary">See what we do</Button>
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Team reviewing a marketing performance dashboard"
            width={800}
            height={533}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full animate-[hero-rise_0.8s_ease-out_0.15s_both] rounded-lg object-cover"
          />
          {/* Replace with a real result once you have client data —
              a specific, honest number does more work here than any
              amount of extra copy. */}
          <div className="absolute -bottom-6 -left-6 hidden animate-[stat-pop_0.5s_ease-out_0.6s_both] rounded-lg bg-white px-5 py-4 shadow-lg sm:block">
            <p className="font-display text-2xl font-[700] text-[#12172B]">3.2×</p>
            <p className="text-xs text-[#4B5169]">avg. lead growth in 90 days</p>
          </div>
        </div>
      </div>
    </section>
  );
}
