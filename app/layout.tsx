"use client";
import React from "react";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}