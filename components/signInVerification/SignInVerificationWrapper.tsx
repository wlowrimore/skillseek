"use client";

import { useState } from "react";
import { UserVerificationModal } from "../ui/UserVerificationModal";

interface WrapperProps {
  children: React.ReactNode;
}

export const SignInVerificationWrapper = ({ children }: WrapperProps) => {
  const [showModal, setShowModal] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const handleVerificationComplete = () => {
    setVerificationComplete(true);
    setShowModal(false);
    const form = document.getElementById("signin-form") as HTMLFormElement;
    const submitButton = form?.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    setTimeout(() => {
      const form = document.getElementById("signin-form") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    });
  };

  const handleClose = () => {
    console.log("Modal closing"); // Add this for debugging
    setShowModal(false);
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    if (!verificationComplete) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div onClick={handleWrapperClick}>
      <UserVerificationModal
        dialogOpen={showModal}
        onClose={handleClose}
        onAccept={handleVerificationComplete}
      />
      {children}
    </div>
  );
};
