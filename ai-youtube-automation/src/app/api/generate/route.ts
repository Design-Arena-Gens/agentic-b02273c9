import { NextResponse } from "next/server";
import {
  AutomationResponseNormalized,
  automationRequestSchema,
} from "@/lib/schema";
import { createAutomationBlueprint } from "@/lib/pipeline";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = automationRequestSchema.parse(json);

    const blueprint: AutomationResponseNormalized =
      await createAutomationBlueprint(payload);

    return NextResponse.json({ success: true, data: blueprint });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message ?? "Unexpected error generating automation.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error generating automation.",
      },
      { status: 500 },
    );
  }
}
