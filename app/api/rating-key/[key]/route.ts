import { createClient } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";

type kParams = {
  key: string;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

export async function GET(req: NextRequest, { params }: { params: kParams }) {
  try {
    const { key } = await params;
    console.log("API: Fetching rating key data for key:", key);

    // Query Sanity for the service being rated
    const query = `*[_type == "ratingKey" && key == $key] {
      _id,
      key,
      service->{
        _id,
        title,
        image,
        category->{
          _id,
          name
        },
        title,
        description
      },
      serviceProvider->{
        _id,
        name,
        image,
        contact->{
          email}
      },
      expiresAt,
      isUsed
    }[0]`;

    const ratingKey = await client.fetch(query, { key });
    console.log("API: Query result:", JSON.stringify(ratingKey, null, 2));

    if (!ratingKey) {
      console.log("API: No rating key found");
      return NextResponse.json(
        { message: "Invalid or expired rating key" },
        { status: 404 }
      );
    }

    // Check if key is expired
    const now = new Date();
    const expiresAt = new Date(ratingKey.expiresAt);

    if (now > expiresAt) {
      console.log("API: Rating key expired");
      return NextResponse.json(
        { message: "Rating key has expired" },
        { status: 403 }
      );
    }

    if (ratingKey.isUsed) {
      console.log("API: Rating key already used");
      return NextResponse.json(
        { message: "Rating key has already been used" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      service: ratingKey.service,
      serviceProvider: ratingKey.serviceProvider,
    });
  } catch (error) {
    console.error("API: Error processing request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
