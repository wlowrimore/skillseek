import { auth } from "@/auth";

export async function displayNameTag() {
  const session = await auth();
  if (session && session?.user?.email) {
    const nameTag = session.user.email.split("@")[0].toLowerCase();
    return `#${nameTag}`;
  } else {
    return "#Anonymous".toLowerCase();
  }
}
