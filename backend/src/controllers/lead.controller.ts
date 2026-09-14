import { Request, Response } from "express";
import { leadSchema } from "../validation/lead.schema";
import { sendLeadToCrm } from "../services/crm.service";

export async function submitLead(req: Request, res: Response) {
  const parseResult = leadSchema.safeParse(req.body);

  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return res.status(400).json({
      success: false,
      errors: fieldErrors,
    });
  }

  const lead = parseResult.data;

  try {
    const crmResult = await sendLeadToCrm(lead);

    return res.status(200).json({
      success: true,
      leadId: crmResult.id,
    });
  } catch (error) {
    console.error("CRM submission failed:", error);

    return res.status(502).json({
      success: false,
      error:
        "We couldn't process your submission right now. Please try again shortly.",
    });
  }
}
