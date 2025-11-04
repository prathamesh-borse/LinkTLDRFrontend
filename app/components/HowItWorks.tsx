"use client";
import React from "react";

export default function HowItWorks() {
    const steps = [
        "Paste LinkedIn post URL",
        "AI analyzes the content",
        "Get your one-line summary",
    ];
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">How It Works</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-3">
                {steps.map((step, idx) => (
                    <li key={idx} className="flex flex-col items-center text-center bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-xl p-6">
                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{idx + 1}</div>
                        <p className="mt-3 text-slate-700">{step}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}