export function trackPageView() {
  window.dataLayer?.push({ event: "page_view" });
}

export function trackCtaClick() {
  window.dataLayer?.push({ event: "cta_click" });
}

export function trackFormStart() {
  window.dataLayer?.push({ event: "form_start" });
}

export function trackFormSubmitted() {
  window.dataLayer?.push({ event: "form_submitted" });
  window.fbq?.("track", "Lead");
}

export function trackFormSubmissionFailure(reason: string) {
  window.dataLayer?.push({ event: "form_submission_failure", reason });
}
