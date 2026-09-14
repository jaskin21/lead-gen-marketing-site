interface FormStatusProps {
  status: "loading" | "success" | "error";
  message?: string;
}

export default function FormStatus({ status, message }: FormStatusProps) {
  const config = {
    loading: {
      text: "Sending your message...",
      className: "text-[#4B5169]",
      role: "status" as const,
      icon: (
        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
          <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    success: {
      text: "Thanks! We'll be in touch shortly.",
      className: "text-[#059669]",
      role: "status" as const,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12l4 4 10-10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    error: {
      text: message ?? "Something went wrong. Please try again.",
      className: "text-[#DC2626]",
      role: "alert" as const,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  } as const;

  const { text, className, role, icon } = config[status];

  return (
    <p
      role={role}
      className={`flex animate-[status-in_0.2s_ease-out_both] items-center gap-2 text-sm ${className}`}
    >
      {icon}
      {text}
    </p>
  );
}
