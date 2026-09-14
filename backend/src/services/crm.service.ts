import { LeadInput } from "../validation/lead.schema";

interface CrmResult {
  id: string;
}

/**
 * Simulates sending a lead to a CRM (e.g. HubSpot).
 * No real credentials or network call — this demonstrates the
 * integration pattern: payload shaping, credential handling,
 * and success/failure branching.
 */
export async function sendLeadToCrm(lead: LeadInput): Promise<CrmResult> {
  const apiKey = process.env.CRM_API_KEY;

  if (!apiKey) {
    throw new Error("CRM_API_KEY is not configured");
  }

  const crmPayload = {
    properties: {
      firstname: lead.name.split(" ")[0],
      lastname: lead.name.split(" ").slice(1).join(" ") || "",
      email: lead.email,
      company: lead.company,
      phone: lead.phone,
      message: lead.message,
    },
  };

  // --- Real call would look like this ---
  // const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${apiKey}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(crmPayload),
  // });
  // if (!response.ok) throw new Error(`CRM responded with ${response.status}`);
  // const data = await response.json();
  // return { id: data.id };

  // --- Simulated call ---
  await simulateNetworkDelay();

  const simulatedFailure = shouldSimulateFailure();
  if (simulatedFailure) {
    throw new Error("Simulated CRM failure (network/timeout)");
  }

  console.log("Simulated CRM payload sent:", crmPayload);

  return { id: `sim_${Date.now()}` };
}

function simulateNetworkDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

// Toggle via env var so you can demo the failure path on demand
function shouldSimulateFailure(): boolean {
  return process.env.SIMULATE_CRM_FAILURE === "true";
}
