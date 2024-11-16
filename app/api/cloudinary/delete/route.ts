import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// export default async function handler(req: any, res: any) {
//   if (req.method === "DELETE") {
//     try {
//       const { deleteToken } = req.body;
//       console.log("DELETE TOKEN:", deleteToken);

//       if (!deleteToken) {
//         return res.status(400).json({ message: "Delete token is required" });
//       }

//       // Use the deleteToken to delete the Cloudinary image
//       await cloudinary.uploader.destroy(deleteToken);

//       res.status(200).json({ message: "Image deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting Cloudinary image:", error);
//       res.status(500).json({ message: "Failed to delete image" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

export async function DELETE(request: Request) {
  console.log("REQUEST:", request);
  try {
    const { deleteToken } = await request.json();
    console.log("DELETE TOKEN:", deleteToken);

    if (!deleteToken) {
      return new Response(
        JSON.stringify({ error: "Delete token is required" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy?token=${deleteToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: deleteToken }),
      }
    );
    console.log("NEWEST RESPONSE:", response);

    const result = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: "Image deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: result.error?.message || "Failed to delete image",
        }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
