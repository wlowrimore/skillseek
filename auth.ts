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
              _id: `author-${user.email}`, // Using email as ID
              name: user.name,
              email: user.email,
              image: user.image,
              roles: [
                {
                  _type: "reference",
                  _ref: "role-contributor",
                },
              ],
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
    async jwt({ token, user }) {
      if (user && user.email) {
        try {
          const author = await client.withConfig({ useCdn: false }).fetch(
            `*[_type == "author" && email == $email][0]{
              _id,
              name,
              email,
              image,
              "roles": roles[]->title
            }`,
            {
              email: user.email,
            }
          );

          if (author) {
            token.id = author._id;
            token.roles = [...author(author.roles || []), "contributor"]; // Default to contributor if no roles found
          } else {
            token.roles = ["contributor"];
          }
        } catch (error) {
          console.error("Error fetching author for JWT:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.roles = (token as { id: string; roles: string[] }).roles;
      }
      return session;
    },
  },
});
