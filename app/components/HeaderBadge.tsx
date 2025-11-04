"use client";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import React from "react";

export default function HeaderBadge() {
    return (
        <Badge className="gap-2 bg-white/70 text-blue-700 border-blue-200 backdrop-blur-xl hover:bg-white">
            <Sparkles className="h-4 w-4" /> AI-Powered LinkedIn Summarizer
        </Badge>
    );
}
