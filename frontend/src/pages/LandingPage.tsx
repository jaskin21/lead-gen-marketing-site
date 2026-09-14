import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import Footer from "../components/layout/Footer";
import LeadForm from "../components/ui/LeadForm";
import { useEffect } from "react";
import { trackPageView } from "../lib/tracking";
import { Helmet } from "react-helmet-async";
import "../styles/brand.css";

export default function LandingPage() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brightly Digital — Data-Driven Digital Marketing</title>
        <meta
          name="description"
          content="Brightly Digital helps small and mid-sized businesses turn traffic into paying customers with SEO, paid ads, and content marketing."
        />
        <meta property="og:title" content="Brightly Digital — Digital Marketing Services" />
        <meta
          property="og:description"
          content="Grow your business with data-driven digital marketing."
        />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Pricing />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
