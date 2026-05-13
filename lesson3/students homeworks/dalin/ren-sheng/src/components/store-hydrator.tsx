"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export function StoreHydrator() {
  useEffect(() => {
    useUserStore.getState().hydrate();
  }, []);
  return null;
}
