"use client";

import { useState } from "react";
import { UserVerificationModal } from "../ui/UserVerificationModal";

interface WrapperProps {
  children: React.ReactNode;
}

export const SignInVerificationWrapper = ({ children }: WrapperProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleVerificationComplete = () => {
    setShowModal(false);
    const form = document.getElementById("signin-form") as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const handleDecline = () => {
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <UserVerificationModal
        dialogOpen={showModal}
        onClose={handleModalClose}
        onDecline={handleDecline}
        onAccept={handleVerificationComplete}
      />
      <div onClick={handleSignInClick}>{children}</div>
    </>
  );
};
