export function validateLinkedInUrl(input: string): boolean {
    if (!input) return false;
    try {
        const url = new URL(input.trim());
        const hostOk = /(^|\.)linkedin\.com$/i.test(url.hostname);
        const path = url.pathname;
        const pathOk = /\/(posts|feed\/update)\//i.test(path) || /activity-\d+/.test(path) || /\/posts\//.test(path);
        return hostOk && pathOk;
    } catch {
        return false;
    }
}