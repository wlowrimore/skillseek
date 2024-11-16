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
      roles: string[];
    };
  }

  interface Token {
    id: string;
    roles: string[];
  }
}

const createValidId = (email: string) => {
  return `author-${email.replace(/[@.]/g, "-")}`;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) {
        console.error("No email provided by Google");
        return false;
      }

      if (account?.provider === "google") {
        try {
          const existingAuthor = await client
            .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
              email: user.email,
            })
            .catch((err) => {
              console.error("Error fetching author:", err);
              return null;
            });

          if (!existingAuthor) {
            const validId = createValidId(user.email);
            try {
              await writeClient.createIfNotExists({
                _type: "author",
                _id: validId, // Using email as ID
                name: user.name || "",
                email: user.email,
                image: user.image || "",
                roles: [
                  {
                    _type: "reference",
                    _ref: "role-contributor",
                  },
                ],
              });
              console.log("New author created successfully");
            } catch (createError) {
              console.error("Error creating author:", createError);
            }
          }

          return true;
        } catch (error) {
          console.error("Error in signin callback:", error);
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      try {
        if (user?.email) {
          const author = await client
            .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
              email: user.email,
            })
            .catch(() => null);

          if (author) {
            token.id = author._id;
            token.roles = author.roles || ["contributor"]; // Default to contributor if no roles found
          } else {
            token.id = createValidId(user.email);
            token.roles = ["contributor"];
          }
        }
      } catch (error) {
        console.error("Error in JWT callback:", error);
        token.roles = token.roles || ["contributor"];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.roles = (token.roles as string[]) || ["contributor"];
      }
      return session;
    },
  },
});
