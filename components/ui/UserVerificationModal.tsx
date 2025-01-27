"use client";

import { Suspense, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ModalTermsOfService from "../signInVerification/ModalTermsOfService";
import LoadingBar from "./LoadingBar";

export interface UserVerificationModalProps {
  dialogOpen: boolean;
  onClose: () => void;
  onDecline: () => void;
  onAccept: () => void;
}

export const UserVerificationModal = ({
  dialogOpen,
  onClose,
  onDecline,
  onAccept,
}: UserVerificationModalProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [isOpen, setIsOpen] = useState(dialogOpen);

  useEffect(() => {
    setIsOpen(dialogOpen);
  }, [dialogOpen]);

  const handleClose = () => {
    setTermsAccepted(false);
    setAgeVerified(false);
    setIsOpen(false);
    onClose();
  };

  const handleAccept = () => {
    if (termsAccepted && ageVerified) {
      onAccept();
      setIsOpen(false);
      onClose();
    }
  };

  const handleDecline = () => {
    setAgeVerified(false);
    setTermsAccepted(false);
    setIsOpen(false);
    onDecline();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Suspense fallback={<LoadingBar />}>
        <DialogContent
          className="max-w-[60rem] flex flex-col md:w-[90vm] max-h-[94%] md:max-h-[85%]
          overflow-y-auto bg-[url('/terms-of-service-modal-bg.webp')]"
        >
          <DialogHeader>
            <DialogTitle>
              <span className="text-sm text-black/90 tracking-wide">
                Before we continue please read and accept our terms of service.
              </span>
            </DialogTitle>
          </DialogHeader>

          <ModalTermsOfService />

          <DialogFooter>
            <div className="mt-2 w-full flex justify-between bg-[#FCF2E4] border-2 border-black/50 rounded-lg py-4 px-3">
              <div className="flex flex-col justify-center gap-4">
                <div className="space-y-6 md:space-y-2 flex flex-col">
                  <div className="flex items-center space-x-2 font-semibold">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) =>
                        setTermsAccepted(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs md:text-sm lg:text-[0.95rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the Terms of Service
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 mr-2 md:mr-0 font-semibold">
                    <Checkbox
                      id="age"
                      checked={ageVerified}
                      onCheckedChange={(checked) =>
                        setAgeVerified(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="age"
                      className="text-xs md:text-sm lg:text-[0.95rem] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm that I am at least 18 years of age
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleAccept}
                  variant="acceptance"
                  disabled={!termsAccepted || !ageVerified}
                  className="w-full sm:w-auto lg:text-lg diabled:cursor-not-allowed"
                >
                  Accept
                </Button>
                <Button
                  variant="decline"
                  onClick={handleDecline}
                  className="w-full sm:w-auto lg:text-lg"
                >
                  Decline
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Suspense>
    </Dialog>
  );
};
