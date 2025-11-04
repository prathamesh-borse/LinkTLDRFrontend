"use client";
import React from "react";

export default function Hero() {
    return (
        <section className="text-center">
            <h1 className="text-2xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Get LinkedIn Posts Summarized in One Line
            </h1>
            <p className="mt-4 text-slate-600 md:text-lg">
                Paste any LinkedIn post URL and get a crisp, accurate one-sentence summary in seconds. Perfect for staying informed without the scroll.
            </p>
        </section>
    );
}