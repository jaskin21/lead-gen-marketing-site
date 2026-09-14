import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { leadSchema, type LeadFormValues } from "../../lib/validation";
import { useLeadStore } from "../../store/leadStore";
import FormStatus from "./FormStatus";
import Button from "./Button";
import { submitLead } from "../../lib/api";
import {
  trackFormStart,
  trackFormSubmissionFailure,
  trackFormSubmitted,
} from "../../lib/tracking";

type Status = "idle" | "loading" | "success" | "error";

const fieldClasses =
  "w-full rounded-md border border-[#E2E4ED] px-3 py-2.5 text-[#12172B] transition-colors focus:border-[#F5A623] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30";

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
      className="bg-[#12172B] px-6 py-20"
      aria-labelledby="lead-form-heading"
    >
      <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl sm:p-10">
        <h2
          id="lead-form-heading"
          className="font-display mb-2 text-2xl font-[600] text-[#12172B]"
        >
          Get your free consultation
        </h2>
        <p className="mb-8 text-sm text-[#4B5169]">
          Tell us about your business — we'll reply within one business day.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-[#12172B]"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              onFocus={handleFieldFocus}
              className={fieldClasses}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-[#DC2626]">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-[#12172B]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              onFocus={handleFieldFocus}
              className={fieldClasses}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-[#DC2626]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-sm font-medium text-[#12172B]"
              >
                Company
              </label>
              <input
                id="company"
                {...register("company")}
                onFocus={handleFieldFocus}
                className={fieldClasses}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
              />
              {errors.company && (
                <p id="company-error" className="mt-1.5 text-sm text-[#DC2626]">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-[#12172B]"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                onFocus={handleFieldFocus}
                className={fieldClasses}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-sm text-[#DC2626]">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-[#12172B]"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message")}
              onFocus={handleFieldFocus}
              className={fieldClasses}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-sm text-[#DC2626]">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || status === "loading"}
            className="w-full"
          >
            {isSubmitting || status === "loading"
              ? "Sending..."
              : "Send message"}
          </Button>

          <div className="min-h-[1.5rem]">
            {status !== "idle" && (
              <FormStatus status={status} message={errorMessage} />
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
