import { trackCtaClick } from "../../lib/tracking";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <span className="text-lg font-bold">Brightly Digital</span>
      <a href="#lead-form" onClick={trackCtaClick} className="...">
        Get started
      </a>
    </nav>
  );
}
