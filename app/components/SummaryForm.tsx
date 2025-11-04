"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, Copy, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner"; // v2.0.3 installed
import { validateLinkedInUrl } from "@/lib/validators";
import { summarizeUrl } from "@/lib/api";

const MOCK_SUMMARIES = [
    "Post explains how consistent networking helps accelerate career growth and encourages professionals to connect with intentional purpose.",
    "Author shares insights on building authentic professional relationships and emphasizes quality connections over quantity.",
    "Post highlights the importance of giving value first in networking and maintaining genuine relationships for long-term success.",
    "LinkedIn thought leader discusses how strategic engagement on the platform can lead to unexpected career opportunities.",
];

export default function SummaryForm() {
    const [urlRequest, seturlRequest] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [seed, setSeed] = useState<number>(0);

    const onSubmit = useCallback(async () => {
        setError(null);
        setSummary(null);

        if (!validateLinkedInUrl(urlRequest)) {
            setError("Please enter a valid LinkedIn post urlRequest (linkedin.com) containing /posts/ or /feed/update/.");
            return;
        }

        setLoading(true);
        try {
            // Call backend; if it fails, gracefully fallback to mock with 2s delay
            const res = await summarizeUrl(urlRequest);
            setSummary(res.summary);
            toast.success("Summary ready");
        } catch (e) {
            // Mock behavior with delay and rotation
            await new Promise((r) => setTimeout(r, 2000));
            const pick = MOCK_SUMMARIES[(seed + Math.floor(Math.random() * MOCK_SUMMARIES.length)) % MOCK_SUMMARIES.length];
            setSummary(pick);
            setSeed((s) => s + 1);
            toast.info("Using mock AI summary (dev mode)");
        } finally {
            setLoading(false);
        }
    }, [seed, urlRequest]);

    const onCopy = useCallback(async () => {
        if (!summary) return;
        await navigator.clipboard.writeText(summary);
        toast.success("Copied to clipboard");
    }, [summary]);

    const onRegenerate = useCallback(async () => {
        if (!urlRequest) return;
        setSummary(null);
        setLoading(true);
        try {
            const res = await summarizeUrl(urlRequest + "?variant=" + (seed + 1));
            setSummary(res.summary);
        } catch {
            await new Promise((r) => setTimeout(r, 2000));
            const pick = MOCK_SUMMARIES[(seed + 1) % MOCK_SUMMARIES.length];
            setSummary(pick);
            setSeed((s) => s + 1);
        } finally {
            setLoading(false);
        }
    }, [seed, urlRequest]);

    const inputHelp = useMemo(() => (
        <p className="text-xs text-slate-500 mt-2">Example: https://www.linkedin.com/posts/username_activity-123456789</p>
    ), []);

    return (
        <Card className="border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl gap-3">
            <CardHeader>
                <CardTitle className="text-slate-800">LinkedIn Post URL</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row gap-3">
                        <Input
                            aria-label="LinkedIn Post urlRequest"
                            placeholder="https://www.linkedin.com/posts/..."
                            value={urlRequest}
                            onChange={(e) => seturlRequest(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onSubmit();
                            }}
                            className="md:flex-1"
                        />
                        <Button onClick={onSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 md:w-auto w-full">
                            {loading ? (
                                <span className="inline-flex items-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" /> Analyzing...</span>
                            ) : (
                                <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> Summarize</span>
                            )}
                        </Button>
                    </div>
                    {inputHelp}

                    {error && (
                        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 inline-flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {summary && (
                        <div className="mt-2">
                            <div className="inline-flex items-center gap-2 text-green-700">
                                <CheckCircle2 className="h-5 w-5" />
                                <span className="font-medium">Summary Ready</span>
                            </div>
                            <div className="mt-3 rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-4 text-slate-700">
                                {summary}
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={onCopy} className="w-full gap-2">
                                    <Copy className="h-4 w-4" /> Copy
                                </Button>
                                <Button variant="outline" onClick={onRegenerate} className="w-full gap-2">
                                    <RefreshCw className="h-4 w-4" /> Regenerate
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}