"use client"

import * as React from "react"

import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";


if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

function ThemeProvider({children} : {
  children: React.ReactNode }){
    return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
    )
  }




export { ThemeProvider }
