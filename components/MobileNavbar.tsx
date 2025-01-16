import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries";
import MobileNavbarContent from "./MobileNavbarContent";

const MobileNavbar = async () => {
  const session = await auth();
  let authorId = null;

  if (session?.user?.email) {
    const author = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {
      email: session.user.email,
    });
    authorId = author?._id;
  }

  return <MobileNavbarContent session={session} authorId={authorId} />;
};

export default MobileNavbar;
