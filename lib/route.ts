import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const { url } = await req.json();
    const backend = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    if (!backend) return NextResponse.json({ error: "API base not configured" }, { status: 500 });
    const upstream = await fetch(`${backend}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });
    const data = await upstream.text();
    return new NextResponse(data, { status: upstream.status, headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" } });
}