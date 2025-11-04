export type SummaryResponse = { summary: string };

export async function summarizeUrl(urlRequest: string): Promise<SummaryResponse> {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";
    console.log("base: ", base);
    const endpoint = base ? `${base}/api/v1/summary/generate` : "/api/summarize"; // use proxy if base is empty
    console.log("endpoint: ", endpoint);
    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlRequest }),
    });
    console.log("res: ", res);

    if (!res.ok) {
        throw new Error("Backend error");
    }
    const data = (await res.json()) as SummaryResponse;
    if (!data?.summary) throw new Error("Invalid response");
    return data;
}