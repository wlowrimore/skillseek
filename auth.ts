import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const existingAuthor = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            email: user.email,
          });

          if (!existingAuthor) {
            await writeClient.create({
              _type: "author",
              id: user.email, // Using email as ID
              name: user.name,
              email: user.email,
              image: user.image,
            });
          }

          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
});
