"use client";
import React from "react";

export default function ExampleHint() {
    return (
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 text-blue-700 p-4">
            <p className="text-sm">
                Example URL format: <span className="font-mono break-all">https://www.linkedin.com/posts/username_activity-123456789</span>
            </p>
        </div>
    );
}