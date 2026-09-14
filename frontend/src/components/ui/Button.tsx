import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#F5A623] text-[#12172B] hover:bg-[#E5981A] focus-visible:outline-[#F5A623]",
  secondary:
    "bg-transparent text-white border border-white/30 hover:border-white/60 focus-visible:outline-white",
  ghost:
    "bg-transparent text-[#12172B] hover:bg-[#12172B]/5 focus-visible:outline-[#12172B]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
