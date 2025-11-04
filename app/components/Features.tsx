"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp, Shield } from "lucide-react";

const features = [
    {
        title: "Lightning Fast",
        desc: "Get summaries in under 5 seconds",
        Icon: Zap,
        color: "text-blue-600",
    },
    {
        title: "AI-Powered",
        desc: "Advanced text extraction & analysis",
        Icon: TrendingUp,
        color: "text-purple-600",
    },
    {
        title: "Privacy First",
        desc: "No data stored without consent",
        Icon: Shield,
        color: "text-green-600",
    },
];

export default function Features() {
    return (
        <section>
            <div className="grid gap-4 md:grid-cols-3">
                {features.map((f) => (
                    <Card key={f.title} className="bg-white/70 backdrop-blur-xl border-slate-200/60">
                        <CardContent className="p-5">
                            <div className={`h-10 w-10 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-center ${f.color}`}>
                                <f.Icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-4 font-semibold text-slate-800">{f.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
