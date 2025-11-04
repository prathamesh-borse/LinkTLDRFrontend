import React from "react";
import Hero from "@/components/Hero";
import SummaryForm from "@/components/SummaryForm";
import Features from "@/components/Features";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 md:px-6 lg:px-8 py-10 md:py-16 items-center mt-10">
        <Hero />
        <div className="mt-8 md:mt-10"><SummaryForm /></div>
        <div className="mt-11"><Features /></div>
        <div className="mt-11"><SiteFooter /></div>
      </div>
    </main>
  );
}
