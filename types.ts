export interface AuthProps {
  isAuthenticated: boolean;
  userImage?: string;
  userName?: string;
  userEmail?: string;
  authorId: string | null | undefined;
}
