import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rating, review, serviceId, providerId, ratingKey } =
      await req.json();

    // Verify the rating key exists and is valid
    const ratingKeyDoc = await client.fetch(
      `*[_type == "ratingKey" && 
        key == $ratingKey && 
        service._ref == $serviceId && 
        serviceProvider._ref == $providerId && 
        !isUsed && 
        dateTime(expiresAt) > dateTime(now())
      ][0]`,
      {
        ratingKey,
        serviceId,
        providerId,
      }
    );

    if (!ratingKeyDoc) {
      return NextResponse.json(
        { message: "Invalid or expired rating key" },
        { status: 400 }
      );
    }

    // Create the rating document
    const ratingDoc = await client.create({
      _type: "rating",
      rating: rating,
      review: review,
      service: {
        _type: "reference",
        _ref: serviceId,
      },
      serviceProvider: {
        // Updated to match your schema
        _type: "reference",
        _ref: providerId,
      },
      user: {
        // Reference the user from the rating key
        _type: "reference",
        _ref: ratingKeyDoc.user._ref,
      },
      createdAt: new Date().toISOString(),
    });

    console.log("Submitted rating:", ratingDoc);

    // Mark the rating key as used
    await client.patch(ratingKeyDoc._id).set({ isUsed: true }).commit();

    return NextResponse.json({ success: true, rating: ratingDoc });
  } catch (error) {
    console.error("API: Error submitting rating:", error);
    return NextResponse.json(
      { message: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
