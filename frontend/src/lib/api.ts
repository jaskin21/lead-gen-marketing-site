import type { LeadFormValues } from "./validation";

const API_URL = import.meta.env.VITE_API_URL;

interface LeadSuccessResponse {
  success: true;
  leadId: string;
}

interface LeadErrorResponse {
  success: false;
  error?: string;
  errors?: Record<string, string[]>;
}

type LeadResponse = LeadSuccessResponse | LeadErrorResponse;

export async function submitLead(
  values: LeadFormValues,
): Promise<LeadResponse> {
  const response = await fetch(`${API_URL}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data: LeadResponse = await response.json();
  return data;
}
