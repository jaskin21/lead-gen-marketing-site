interface FormStatusProps {
  status: "loading" | "success" | "error";
  message?: string;
}

export default function FormStatus({ status, message }: FormStatusProps) {
  if (status === "loading") {
    return (
      <p className="text-sm text-gray-500" role="status">
        Sending your message...
      </p>
    );
  }
  if (status === "success") {
    return (
      <p className="text-sm text-green-700" role="status">
        Thanks! We'll be in touch shortly.
      </p>
    );
  }
  return (
    <p className="text-sm text-red-600" role="alert">
      {message ?? "Something went wrong. Please try again."}
    </p>
  );
}
