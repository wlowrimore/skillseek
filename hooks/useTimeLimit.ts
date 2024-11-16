"use client";

import { useState, useEffect } from "react";

export const useTimeLimit = (imageUrl: string) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Cleanup timeout on unmount or when imageUrl changes
      return () => clearTimeout(timer);
    }
  }, [imageUrl]);

  return showSuccess;
};
