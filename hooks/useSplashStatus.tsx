"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function useSplashStatus() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      if (!session?.user) {
        const timer = setTimeout(() => {
          setIsSplashVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isSplashVisible, session?.user]);

  return isSplashVisible;
}
