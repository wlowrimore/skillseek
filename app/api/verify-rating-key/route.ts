import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Set to false for real-time data
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { key, serviceId, providerId } = await req.json();
    console.log("Received parameters:", { key, serviceId, providerId });

    if (!key || !serviceId || !providerId) {
      console.log("Missing required parameters:", {
        key,
        serviceId,
        providerId,
      });
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Query Sanity for the rating key with more detailed conditions
    const query = `*[_type == "ratingKey" && 
      key == $key && 
      service._ref == $serviceId && 
      serviceProvider._ref == $providerId && 
      !isUsed && 
      dateTime(expiresAt) > dateTime(now())
    ] {
      _id,
      key,
      service->{_id, name},
      serviceProvider->{_id, name},
      expiresAt,
      isUsed
    }[0]`;

    console.log("Executing query:", query);
    console.log("With parameters:", { key, serviceId, providerId });

    const ratingKey = await client.fetch(query, { key, serviceId, providerId });

    console.log("Query result:", JSON.stringify(ratingKey, null, 2));

    if (!ratingKey) {
      console.log("No rating key found for parameters");
      return NextResponse.json(
        { message: "Invalid or expired rating key" },
        { status: 403 }
      );
    }

    // Additional validation checks
    const now = new Date();
    const expiresAt = new Date(ratingKey.expiresAt);

    if (now > expiresAt) {
      console.log("Rating key expired:", {
        now: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      });
      return NextResponse.json(
        { message: "Rating key has expired" },
        { status: 403 }
      );
    }

    if (ratingKey.isUsed) {
      console.log("Rating key already used");
      return NextResponse.json(
        { message: "Rating key has already been used" },
        { status: 403 }
      );
    }

    console.log("Rating key valid:", ratingKey);
    return NextResponse.json({
      valid: true,
      data: {
        serviceName: ratingKey.service.name,
        providerName: ratingKey.serviceProvider.name,
      },
    });
  } catch (error) {
    console.error("Error verifying rating key:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
