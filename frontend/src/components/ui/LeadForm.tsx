import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { leadSchema, type LeadFormValues } from "../../lib/validation";
import { useLeadStore } from "../../store/leadStore";
import FormStatus from "../ui/FormStatus";
import { submitLead } from "../../lib/api";
import {
  trackFormStart,
  trackFormSubmissionFailure,
  trackFormSubmitted,
} from "../../lib/tracking";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const setSubmitted = useLeadStore((s) => s.setSubmitted);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  function handleFieldFocus() {
    if (!hasStartedForm) {
      trackFormStart();
      setHasStartedForm(true);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  async function onSubmit(values: LeadFormValues) {
    setStatus("loading");
    setErrorMessage(undefined);

    try {
      const result = await submitLead(values);

      if (result.success) {
        setStatus("success");
        setSubmitted();
        trackFormSubmitted(); // fires form_submitted + fbq Lead, only here
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error ?? "Please check the form and try again.");
        trackFormSubmissionFailure(result.error ?? "validation_error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        "Network error — please check your connection and try again.",
      );
      trackFormSubmissionFailure("network_error");
    }
  }

  return (
    <section
      id="lead-form"
      className="px-6 py-16 max-w-lg mx-auto"
      aria-labelledby="lead-form-heading"
    >
      <h2
        id="lead-form-heading"
        className="text-2xl font-bold text-center mb-8"
      >
        Get your free consultation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            onFocus={handleFieldFocus}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-600 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            onFocus={handleFieldFocus}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company
          </label>
          <input
            id="company"
            {...register("company")}
            onFocus={handleFieldFocus}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="text-sm text-red-600 mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            onFocus={handleFieldFocus}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-red-600 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            onFocus={handleFieldFocus}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || status === "loading"}
          className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {status !== "idle" && (
          <FormStatus status={status} message={errorMessage} />
        )}
      </form>
    </section>
  );
}
