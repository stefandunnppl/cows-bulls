"use client";

import { PropsWithChildren } from "react";
import { Provider as JotaiProvider } from "jotai";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <JotaiProvider>{children}</JotaiProvider>
);
